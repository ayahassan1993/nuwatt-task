import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-anumation.directive';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
}
