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
  apps: App[] = [];

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
        this.errorMessage = '';  // Clear the error message on success
        this.fetchApps();
      }, error => {
        if (error.status === 400 && error.error.message === "Port is already in use") {
          this.errorMessage = 'Port is already in use';
        }
        else if (error.error.message === "App name is already taken") {
          this.errorMessage = 'App name is already taken';
         } else {
          console.error('Error creating app:', error);
          this.errorMessage = 'An error occurred while creating the app';
        }
        this.successMessage = '';
      });
  }


  fetchApps() {
    this.http.get<App[]>('http://localhost:5000/get-apps')
      .subscribe(data => {
        this.apps.push(...data);
        console.log(this.apps)
      }, error => {
        console.error('Error in fetching apps:', error);
      });
  }

}

