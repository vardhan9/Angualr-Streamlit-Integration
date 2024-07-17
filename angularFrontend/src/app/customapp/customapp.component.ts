import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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
  constructor(private http: HttpClient) { }
  onSubmit() {
    const payload = {
      appName: this.appName,
      portNumber: this.portNumber
    };

    this.http.post('http://localhost:5000/create-app', payload)
      .subscribe(response => {
        console.log('App created successfully:', response);
      }, error => {
        console.error('Error creating app:', error);
      });
  }

}
