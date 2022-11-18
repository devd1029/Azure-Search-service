import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  private isShowDiv: Boolean = false;
  Languagelist: any = [];
  constructor(private sharedservice: SharedService) { }

  getLanguageList() {
    this.sharedservice.GetLanguageList().subscribe(data => {
      console.log("Language list : "+data);
      this.Languagelist = data;
    });
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
    console.log("set to " + this.isShowDiv);
  }  
  ngOnInit() {
    this.getLanguageList();
  }

}
