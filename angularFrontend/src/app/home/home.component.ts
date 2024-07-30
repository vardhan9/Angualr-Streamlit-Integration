import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  //standalone: true,
  //imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showHeader: boolean = true;
  constructor(private router: Router) {
    /*this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = event.url !== '/customapp';
    });*/
  }
  
  clickNewApp(){
    this.router.navigate(['customapp']);
    console.log('new app clicked')
  }

}
