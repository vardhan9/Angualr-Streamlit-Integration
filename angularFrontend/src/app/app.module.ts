import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EditorPreviewComponent } from './editor-preview/editor-preview.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { HomeComponent } from './home/home.component';
import { RouterModule} from '@angular/router';
import { CustomappComponent } from './customapp/customapp.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    EditorPreviewComponent,
    HomeComponent,
    CustomappComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
