import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

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
  safeUrl: SafeResourceUrl | null = null;
  showEditor: boolean = false;  // Flag to control the visibility of the editor
  //editorOptions = {theme: 'vs-dark', language: 'python'};
  executeCode(code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {code });
  }
  constructor(private http: HttpClient, private appService: AppService,  private sanitizer: DomSanitizer,private router: Router){}
  ngOnInit(): void {
    if (this.selectedApp) {
      this.fetchAppCode();
      console.log(this.selectedApp.portNumber)
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:${this.selectedApp.portNumber}`);
      console.log('safeUrl: ', this.safeUrl);
      this.showEditor = false;
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


  goBack(): void {
    this.showEditor = false;  // Hide the editor
    this.safeUrl = null;  // Reset the safeUrl
    this.selectedApp = null;  // Reset the selectedApp
    this.router.navigate(['']);
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

