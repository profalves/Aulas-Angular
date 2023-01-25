import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe(
      (response) => {
        console.log('GET Response', response)
      })

    // this.productsService.createProduct(this.bodyRequest).subscribe(
    //   (response) => console.log('POST Response', response)
    // );

    // this.productsService.updateProduct(this.idProduct, this.bodyRequest).subscribe(
    //   (response) => console.log('PUT Response', response)
    // );
    // this.productsService.changePrice(this.idProduct, { price: 999.99 }).subscribe(
    //   (response) => console.log('PATCH Response', response)
    // );
    // this.productsService.deleteProduct(this.idProduct).subscribe(
    //   (response) => console.log('DELETE Response', response)
    // );
  }

  productList: Product[] = []
  idProduct: number = 1
  bodyRequest: Product = productMock

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (response: { products: Product[] }) => {
        console.log(response)
        this.productList = response.products
      },
      error: error => { console.log(error) }
    })

    console.log(this.productList, 'List of products')
  }
}
