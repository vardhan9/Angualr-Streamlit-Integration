import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorPreviewComponent } from './editor-preview/editor-preview.component';

const routes: Routes = [
  { path: 'editor-preview', component: EditorPreviewComponent }, // Assuming HomeComponent is your initial page
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }