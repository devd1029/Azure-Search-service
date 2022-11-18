import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderInterceptor } from './LoaderInterceptor';
import { SpinLoaderService } from './spin-loader.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ShowListComponent } from './language/show-list/show-list.component';
import { EditComponent } from './language/edit/edit.component';
import { AddNewComponent } from './language/add-new/add-new.component';
import { SharedService } from './shared.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LanguageComponent } from './language/language.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SpinnerComponent,
    ProductListComponent,
    ShowListComponent,
    EditComponent,
    AddNewComponent,
    LanguageComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent }
    ]),

    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule, MatCheckboxModule,
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [
    SharedService,
    SpinLoaderService,
    {
      provide : HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
