import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ShowListComponent } from '../language/show-list/show-list.component';
import { AddNewComponent } from '../language/add-new/add-new.component';

const routes: Routes = [
  { path: 'product-list', component:ProductListComponent },
  { path: 'language/list', component: ShowListComponent },
  {path:'language/add',component:AddNewComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
