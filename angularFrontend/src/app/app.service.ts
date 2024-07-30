import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private selectedAppSource = new BehaviorSubject<any>(null);
  selectedApp$ = this.selectedAppSource.asObservable();

  setSelectedApp(app: any): void {
    this.selectedAppSource.next(app);
    console.log(this.selectedAppSource)
  }
}
