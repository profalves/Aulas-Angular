import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';

interface ResponseAPI {
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  readonly apiUrl = 'https://dummyjson.com';

  getProducts() {
    return this.http.get<ResponseAPI>(`${this.apiUrl}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<Product>(`${this.apiUrl}/products/add`, product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  changePrice(id: number, product: { price: number }) {
    return this.http.patch<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`)
  }

  public loadProductsList(): Observable<ResponseAPI[]> {
    return this.http.get<ResponseAPI[]>(`${this.apiUrl}/products`)
      .pipe(
        map(this.mapProducts)
      )
  }

  private mapProducts(data: any): ResponseAPI[] {
    let list: ResponseAPI[] = [];

    data.forEach((product: any) => list.push(Object.assign(product)));

    return list
  }
}
