import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface App {
  appName: string;
  portNumber: number;
  status: string;
}

@Component({
  selector: 'app-customapp',
  //standalone: true,
  //imports: [],
  templateUrl: './customapp.component.html',
  styleUrl: './customapp.component.css'
})
export class CustomappComponent {
  appName: string = '';
  portNumber: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  appNameTaken: string = '';
  successTerminateMessage: string = '';
  apps: App[] = [];
  uniqueApps: App[] = []; // To store unique apps
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchApps();
  }

  onSubmit() {
    const payload = {
      appName: this.appName,
      portNumber: this.portNumber
    };

    this.http.post('http://localhost:5000/create-app', payload)
      .subscribe(response => {
        console.log('App created successfully:', response);
        this.successMessage = `${this.appName} created successfully on port ${this.portNumber}`;
        this.clearMessage();
        //this.errorMessage = '';  // Clear the error message on success
        this.fetchApps();
      }, error => {
        if (error.status === 400 && error.error.message === "Port is already in use") {
          this.errorMessage = 'Port is already in use';
          this.clearMessage();
        }
        else if (error.error.message === "App name is already taken") {
          this.errorMessage = 'App name is already taken';
          this.clearMessage();
         } else {
          console.error('Error creating app:', error);
          this.errorMessage = 'An error occurred while creating the app';
          this.clearMessage();
        }
        this.successMessage = '';
      });
  }


  fetchApps() {
    this.http.get<App[]>('http://localhost:5000/get-apps')
      .subscribe(data => {
        this.apps.push(...data);
        console.log(this.apps)
        this.removeDuplicates(); // Remove duplicates before displaying
      }, error => {
        console.error('Error in fetching apps:', error);
      });
  }

  editApp(app: App) {
    console.log('Edit app:', app);
    // Implement edit logic here
  }

  terminateApp(app: App) {
    this.http.post<any>(`http://localhost:5000/terminate-app`, { appName: app.appName })
      .subscribe(response => {
        console.log(response.message);
        this.successTerminateMessage = `${app.appName} terminated successfully on port ${app.portNumber}`;
        this.clearMessage();
        this.uniqueApps = this.uniqueApps.filter(a => a.appName !== app.appName); // Remove the app from the array
        //this.fetchApps(); // Refresh apps list after terminating an app
      }, error => {
        console.error('Error terminating app:', error);
      });
  }

  removeDuplicates() {
    const appNames = new Set();
    this.uniqueApps = this.apps.filter(app => {
      if (!appNames.has(app.appName)) {
        appNames.add(app.appName);
        return true;
      }
      return false;
    });
  }

  clearMessage() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
      this.successTerminateMessage = '';
    }, 5000);
  }

}

