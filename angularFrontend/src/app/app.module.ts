import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EditorPreviewComponent } from './editor-preview/editor-preview.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';




@NgModule({
  declarations: [
    AppComponent,
    EditorPreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
