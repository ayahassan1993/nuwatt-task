import { Component, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ProductsService } from '../products/services/products.sercis';
import { Product } from '../products/models/product.model';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  subscription: Subscription = new Subscription();

  cartList: WritableSignal<Cart[]> = signal([]);
  productsList: WritableSignal<Product[]> = signal([]);
  constructor(
    private cartService: CartService,
    private productsServ: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.subscription.add(
      this.productsServ
        .getProducts()
        .subscribe((res: any) => (this.productsList.set(res), this.getCart()))
    );
  }

  getCart() {
    const toDate = new Date().toISOString().split('T')[0];
    let fromDate: any = new Date();
    fromDate.setDate(fromDate.getDate() - 2);
    fromDate = fromDate.toISOString().split('T')[0];

    this.subscription.add(
      this.cartService.getCartData(fromDate, toDate).subscribe((res: any) => {
        const products: Cart[] = [];
        res[0]?.products.forEach(
          (product: { productId: number; quantity: number }) => {
            let item = this.productsList().find(
              (prod) => prod.id == product.productId
            );
            item
              ? products.push({ product: item, quantity: product.quantity })
              : null;
          }
        );
        this.cartList.set(products);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
