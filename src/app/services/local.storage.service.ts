import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageRefService } from "./local.storage.ref.service";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  private localStorage  : Storage;

  private pMyData$ = new BehaviorSubject<any>(null);
  myData$ = this.pMyData$.asObservable();

  constructor(private localStorageRefService: LocalStorageRefService) {
    this.localStorage = localStorageRefService.localStorage;
  }

  setFavorites(data: any): void {
    const jsonData = JSON.stringify(data);
    this.localStorage.setItem("myData", jsonData);
    this.pMyData$.next(data);
  }

  loadFavorites(): void {
    const raw:any = this.localStorage.getItem("myData");
    const data = JSON.parse(raw);
    this.pMyData$.next(data);
  }

  clearFavorites() {
    this.localStorage.removeItem("myData");
    this.pMyData$.next(null);
  }

  clearAllLocalStorage(): void {
    this.localStorage.clear();
    this.pMyData$.next(null);
  }
}
