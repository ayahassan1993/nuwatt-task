import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartData(from: string, to: string) {
    // Note : i don't use the date because it returnes an empty array, because it is a dummy data
    return this.http.get(
      `carts/user/2?startdate=2019-12-10&enddate=2020-10-10`
    );
  }
}
