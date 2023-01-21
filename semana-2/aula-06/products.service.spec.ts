import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { productsListData } from '../mock/products';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;
  const API_URL = 'https://dummyjson.com/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should group the products by category', () => {

    const categoryGroups = service.groupByCategory(productsListData);


    const smartphones = categoryGroups.find(group => group.category === 'smartphones');
    const laptops = categoryGroups.find(group => group.category === 'laptops');

    expect(smartphones?.products.length).toBe(5);
    expect(laptops?.products.length).toBe(5);
  })

  it('should be products API contains GET method', () => {
    service.getProducts().subscribe();

    const http = httpController.expectOne(API_URL)

    expect(http.request.method).toBe('GET');
  })

  it('should be products API contains data', (done) => {

    service.getProducts().subscribe({
      next: (response: any) => {
        expect(response.length).toBeGreaterThan(0)
        expect(response[0].title).toEqual('iPhone 9')
        done();
      },
      error: (err) => { }
    });

    const http = httpController.expectOne(API_URL);

    expect(http.request.method).toBe('GET');
    expect(http.request.headers).toBeTruthy();

    http.flush(productsListData);
  })

  it('should be products API has more than 8 products with done() function', (done) => {
    service.getProducts().subscribe((response: any) => {
      expect(response.length).toBeGreaterThan(8);
      done();
    });

    const http = httpController.expectOne(API_URL);

    expect(http.request.method).toBe('GET');

    http.flush(productsListData);
  })

  it('should be products API has more than 8 products with fake Promise', fakeAsync(() => {
    service.getProducts().subscribe((response: any) => {
      expect(response.length).toBeGreaterThan(8);
    });

    const http = httpController.expectOne(API_URL);

    expect(http.request.method).toBe('GET');

    http.flush(productsListData);
  }));



});
