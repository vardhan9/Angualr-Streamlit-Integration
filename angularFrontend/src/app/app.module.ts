import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent
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
