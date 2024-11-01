import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const layoutRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full",
      },
      {
        path: "products",
        loadComponent: () =>
          import("../../modules/products/pages/products/products.component").then(
            (mod) => mod.ProductsComponent
          ),
      },
      {
        path: "cart",
        loadComponent: () =>
          import(
            "../../modules/cart/cart.component"
          ).then((mod) => mod.CartComponent),
      },
    ]

    }
  
];
