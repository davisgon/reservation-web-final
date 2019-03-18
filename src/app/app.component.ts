import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-web';

  english(){
    window.open(`http://35.193.230.27/#/`,'_self');
  }

  french(){
     window.open(`http://35.193.230.27/fr/#/`,'_self');
  }
}
