import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-preview',
  //standalone: true,
  //imports: [],
  templateUrl: './editor-preview.component.html',
  styleUrl: './editor-preview.component.css'
})
export class EditorPreviewComponent {

  private apiUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient){}
  showForm = false;
  appName: string = 'temp_editor';
  port: number = 8501;
  code: string = `import streamlit as st\nst.title('New App')`;
  message: string | null = null;
  name:any
  streamlitAppUrl: string | null = null;
  executeCode(code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {code });
  }

  createApp() {
    if (this.appName && this.port && this.code) {
      this.executeCode(this.code).subscribe(
        response => {
          //this.message = `App ${this.appName} created successfully on port ${this.port}!`;
          this.streamlitAppUrl = `http://localhost:5000/`;
          //const streamlitUrl = 'http://localhost:8501'; // Replace with actual URL
            //window.location.href = streamlitUrl;
        },
        error => {
          this.message = `Error creating app: ${error.message}`;
        }
      );
    }
  }


}

