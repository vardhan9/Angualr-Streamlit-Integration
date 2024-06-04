import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-multi-apps',
  //standalone: true,
  //imports: [],
  templateUrl: './create-multi-apps.component.html',
  styleUrl: './create-multi-apps.component.css'
})


export class CreateMultiAppsComponent {
  private apiUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient){}
  showForm = false;
  appName: string = '';
  port: number = 8501;
  code: string = `import streamlit as st\nst.title('New App')`;
  message: string | null = null;
  name:any
  toggleForm() {
    this.showForm = !this.showForm;
    console.log('App created');
  }
  appNameSubmit(){
      console.log('App Name Submitted:', this.name);
      this.name = '';
      this.showForm = false;
      this.updateCode(this.appName, this.code, this.port);
  }

  updateCode(appName: string,  code: string, port: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { app_name: appName,  code, port });
    console.log('update code called', appName)
  }

  createApp() {
    if (this.appName && this.port && this.code) {
      this.updateCode(this.appName, this.code, this.port).subscribe(
        response => {
          this.message = `App ${this.appName} created successfully on port ${this.port}!`;
        },
        error => {
          this.message = `Error creating app: ${error.message}`;
        }
      );
    }
  }
}

