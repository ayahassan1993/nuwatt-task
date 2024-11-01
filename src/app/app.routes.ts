import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadChildren: () =>
          import("./core/layout/layout.routs").then((mod) => mod.layoutRoutes),
      },
];
