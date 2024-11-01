import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../services/products.sercis';
import { fromEvent, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  subscription: Subscription = new Subscription();

  activeCatigory: WritableSignal<string> = signal('All');
  catigoriesList: WritableSignal<string[]> = signal([]);
  productsList: WritableSignal<Product[]> = signal([]);
  productsLimit: WritableSignal<number> = signal(10);
  productsTotalCount: Signal<number> = signal(20).asReadonly();
  isThrottled: WritableSignal<boolean> = signal(false);
  constructor(
    private productsService: ProductsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCatigories();
    this.getProducts();

    this.subscription.add(
      fromEvent(window, 'scroll').subscribe((e) => {
        this.onWindowScroll();
      })
    );
  }

  getCatigories() {
    this.subscription.add(
      this.productsService
        .getCategories()
        .subscribe((res: any) => this.catigoriesList.set(res))
    );
  }

  getProducts() {
    this.subscription.add(
      this.productsService
        .getProductsByLimit(this.productsLimit())
        .subscribe((res: any) => this.productsList.set(res))
    );
  }

  getProductsByCatigory() {
    this.subscription.add(
      this.productsService
        .getProductsByCatigory(this.activeCatigory())
        .subscribe((res: any) => this.productsList.set(res))
    );
  }

  addToCart(product: Product) {
    const body = {
      userId: 11,
      date: new Date().toISOString().split('T')[0],
      products: [{ productId: product.id, quantity: 1 }],
    };
    this.subscription.add(
      this.productsService
        .addToCart(body)
        .subscribe(() => this.toaster.success('Product Added Successfully'))
    );
  }

  // get data on scroll
  onWindowScroll() {
    if (!this.isThrottled()) {
      this.isThrottled.set(true);
      setTimeout(() => {
        this.handleScroll();
        this.isThrottled.set(false); // Reset throttle flag
      }, 200); // Adjust the throttle delay as needed
    }
  }
  handleScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (windowHeight + scrollPosition >= documentHeight - 100) {
      this.productsList().length < this.productsTotalCount() &&
      this.activeCatigory() == 'All'
        ? (this.productsLimit.set(this.productsLimit() + 5),
          this,
          this.getProducts())
        : null;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
