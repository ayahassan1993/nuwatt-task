import { Component, input } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  item = input.required<Cart>();
}
