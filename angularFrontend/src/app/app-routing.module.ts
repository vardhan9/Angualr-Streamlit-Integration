import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomappComponent } from './customapp/customapp.component';
import { EditorPreviewComponent } from './editor-preview/editor-preview.component';

export const routes: Routes = [
  { path: 'customapp', component: CustomappComponent },
  { path: 'editor-preview', component: EditorPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }