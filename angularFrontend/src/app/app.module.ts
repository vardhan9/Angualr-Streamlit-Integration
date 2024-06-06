import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { CreateMultiAppsComponent } from './create-multi-apps/create-multi-apps.component';
import { AppRoutingModule } from './app-routing.modules';
import { EditorPreviewComponent } from "./editor-preview/editor-preview.component";

@NgModule({
    declarations: [
        AppComponent,
        CodeEditorComponent,
        CreateMultiAppsComponent,
        EditorPreviewComponent,
    ],

    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MonacoEditorModule.forRoot(),
       
        EditorPreviewComponent
    ],

    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
