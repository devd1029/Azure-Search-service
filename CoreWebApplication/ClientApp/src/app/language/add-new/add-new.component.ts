import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  Language: string;
  Country: string;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }
  addNew() {
    var val = {
      language: this.Language,
      country_Language: this.Country
    }
    this.sharedService.AddLanguage(val).subscribe(res => {
      alert(res);
    });
  }

  clear() {
    this.Language = "";
    this.Country = "";
  }
}
