import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomappComponent } from './customapp/customapp.component';

export const routes: Routes = [
  { path: 'customapp', component: CustomappComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }