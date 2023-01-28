import { Category } from './../../shared/models/category';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { productsListData } from '../mock/products';
import { Product } from 'src/app/shared/models/product';

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

});
