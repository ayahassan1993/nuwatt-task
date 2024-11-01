import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showloading = false;
  subscribe: Subscription = new Subscription();

  constructor(
    private loadingServ: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.loadingServ.showLoading.subscribe((res) => {
      this.showloading = res;
      this.cdr.detectChanges(); // To update the view immediately after updating the showloading property.
    });
  }
}
