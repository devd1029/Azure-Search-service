import { Component, OnInit } from '@angular/core';
import { SpinLoaderService } from '../spin-loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  public spin: boolean = true;
  constructor(public spinLoader: SpinLoaderService) {
   
  }

  ngOnInit() {
  }

}
