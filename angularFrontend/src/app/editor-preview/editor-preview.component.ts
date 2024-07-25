import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-preview',
  //standalone: true,
  //imports: [],
  templateUrl: './editor-preview.component.html',
  styleUrl: './editor-preview.component.css'
})
export class EditorPreviewComponent implements OnInit {
  @Input() selectedApp: any;
  code: string = '';
  editorOptions = { theme: 'vs-dark', language: 'python' };
  successMessage: string = '';
  private apiUrl = 'http://localhost:5000/';
  appName: string = 'temp_editor';
  port: number = 8501;
  //: string = `import streamlit as st\nst.title('New App')`;
  message: string | null = null;
  name:any
  streamlitAppUrl: string | null = null;
  //editorOptions = {theme: 'vs-dark', language: 'python'};
  executeCode(code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {code });
  }
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    if (this.selectedApp) {
      this.fetchAppCode();
      console.log(this.selectedApp.portNumber)
    }
  }

  fetchAppCode(): void {
    this.http.get<{ code: string }>(`http://localhost:5000/get-app-code?appName=${this.selectedApp.appName}`)
      .subscribe(data => {
        this.code = data.code;
      });
  }

  updateApp(): void {
    const payload = { appName: this.selectedApp.appName, code: this.code };
    this.http.post('http://localhost:5000/update-app', payload)
      .subscribe(() => {
        this.successMessage = `${this.selectedApp.appName} updated successfully`;
        setTimeout(() => this.successMessage = '', 5000);
      });
  }

  clear(): void {
    this.code = '';
  }








  createApp() {
    if (this.appName && this.port && this.code) {
      console.log(this.code);
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

