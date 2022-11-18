import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinLoaderService } from './spin-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private loadingService: SpinLoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('caught')
    this.totalRequests++;
    this.loadingService.setLoading(true);
    console.log('set');
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
          console.log('revert');
        }
      })
    );
  }
}
