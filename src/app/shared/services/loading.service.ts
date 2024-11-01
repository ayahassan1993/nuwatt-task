import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  showLoading = new BehaviorSubject(false);
  constructor() {}

  shaowSpinner() {
    this.showLoading.next(true);
  }
  hideSpinner() {
    this.showLoading.next(false);
  }
}
