import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, map, mergeMap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { Product } from './../../shared/models/product';

interface ResponseAPI {
  products: Product[];
}

import productMock from './mock'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productsService: ProductsService) {

  }

  productList: Product[] = []
  idProduct: number = 1
  bodyRequest: Product = productMock
  savedList: Product[] = [];

  getProductList() {
    this.productsService.getProducts()
      .pipe(
        map(source => {
          let list = source.products
            .map((product: Product) => ({
              ...product,
              DELETED: false,
              promotionalPrice: (product.price - product.discountPercentage)
            }))
          return list;
        })
      )
      .subscribe({
        next: (response) => {
          this.productList = response;
        },
        error: error => { console.log(error) }
      })
  }

  @ViewChild('search', { static: true }) search!: ElementRef;

  ngOnInit(): void {
    this.getProductList();

    fromEvent(this.search.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        // mergeMap((value: string) => this.productsService.searchProducts(value))
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value: string) => this.productsService.searchProducts(value))
      ).subscribe((data: any) => {
        console.log(data.products, 'from event');

        this.productList = data.products
      })
  }

}
