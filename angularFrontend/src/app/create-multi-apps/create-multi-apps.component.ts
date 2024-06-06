import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


interface StreamlitApp {  // Interface definition moved here
  name: string;
  status: string;  // Add a status property (e.g., "Running", "Stopped")
  data: any;  // Placeholder for app data (optional)
}
@Component({
  selector: 'app-create-multi-apps',
  //standalone: true,
  //imports: [],
  templateUrl: './create-multi-apps.component.html',
  styleUrl: './create-multi-apps.component.css'
})

export class CreateMultiAppsComponent {

  private apiUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient,private router: Router){}
  showForm = false;
  appName: string = '';
  port: number = 8501;
  code: string = `import streamlit as st\nst.title('New App')`;
  message: string | null = null;
  name:any
  streamlitAppUrl: string | null = null;
  selectedApp: string = '';
  apps: StreamlitApp[] = [];
  showEditor = false;
  
 // ngOnInit() {
 //   this.fetchAppStatuses();  // Get initial app statuses on component load
 // }
  fetchAppStatuses() {
    this.http.get<StreamlitApp[]>('http://localhost:5000/streamlit-apps')
      .subscribe((apps) => {
        this.apps = apps;
      });
  }

  startStreamlitApp() {
    if (!this.selectedApp) {
      alert('Please select an app');
      return;
    }

    this.http.post(`http://localhost:5000/${this.selectedApp}`, {})
      .subscribe(() => {
        this.fetchAppStatuses();  // Update app statuses after starting an app
      }, (error) => {
        console.error('Error starting Streamlit app:', error);
      });
  }
  toggleForm() {
    this.showForm = !this.showForm;
    console.log('App created');
  }
  appNameSubmit(){
      console.log('App Name Submitted:', this.name);
      this.name = '';
      this.showForm = false;
     // this.updateCode(this.appName, this.code, this.port);
  }

 // updateCode(appName: string,  code: string, port: number): Observable<any> {
 //   return this.http.post<any>(`${this.apiUrl}`, { app_name: appName,  code, port });
 // }

  /*createApp() {
    if (this.appName && this.port && this.code) {
      this.updateCode(this.appName, this.code, this.port).subscribe(
        response => {
          this.message = `App ${this.appName} created successfully on port ${this.port}!`;
          this.streamlitAppUrl = `http://localhost:${this.port}`;
          //const streamlitUrl = 'http://localhost:8501'; // Replace with actual URL
            //window.location.href = streamlitUrl;
        },
        error => {
          this.message = `Error creating app: ${error.message}`;
        }
      );
    }
  }

  onCreateApp() {
    if (!this.code) {
      alert('Please enter Streamlit code');
      return;
    }

    const fileName = 'app1.py'; // Adjust based on your naming convention
    this.http.post('http://localhost:5000/create-streamlit', { code: this.code, fileName })
      .subscribe(() => {
        console.log('Streamlit app created (simulated)');
        this.showEditor = false; // Hide the code editor
      }, (error) => {
        console.error('Error creating app:', error);
        alert('Failed to create app. Check server logs for details.');
      });
  }


  toggleEditor() {
    this.showEditor = !this.showEditor;
    this.code = ''; // Clear code when opening editor
  }

  openEditor(){
    console.log('user clicked openEditor');
    this.router.navigate(['/editor-preview']);
  }
}
*/
