import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { productsListData } from '../data/products';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = new ProductsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should group the products by category', () => {
    const categoryGroups = service.groupByCategory(productsListData);

    const smartphones = categoryGroups.find(group => group.category === 'smartphones');

    expect(smartphones?.products.length).toBe(5);
  })
});
