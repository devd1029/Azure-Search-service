import { Injectable } from '@angular/core';

@Injectable()
export class SpinLoaderService {
  private Loading: boolean;

  constructor() { }

  setLoading(loading: boolean) {
    this.Loading = loading;
    console.log(this.Loading);
  }

  getLoading(): boolean {
    console.log("getting "+this.Loading);
    return this.Loading;
  }
}
