import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'protractor';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public products: Product[];
  public baseUrls;


  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrls = baseUrl;
    
    http.get<Product[]>(baseUrl + 'api/Product').subscribe(result => {
      this.products = result;
     
    }, error => console.error(error));
  }

  performSearch(query) {
    this.http.get<Product[]>(this.baseUrls + 'api/Product?query=' + query).subscribe(result => {
      this.products = result;
    },error=>console.error(error));
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Product {
  id?: string;
  product_name: string;
  culture: string;
  product_category_name?: string;
  product_sub_category?: string;
  finish?: string;
  hex?: string;
  color_family_id?: string;
  product_short_description?: string;
  product_long_description?: string;
}
