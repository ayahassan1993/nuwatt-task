import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`products`);
  }
  getProductsByLimit(limit: number) {
    return this.http.get(`products?limit=${limit}`);
  }

  getCategories() {
    return this.http.get(`products/categories`);
  }

  getProductsByCatigory(category: string) {
    return this.http.get(`products/category/${category}`);
  }

  addToCart(body: any) {
    return this.http.post(`carts`, body);
  }
}
