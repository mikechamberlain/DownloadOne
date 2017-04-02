import { Component } from '@angular/core';

@Component({
  selector: 'do-root',
  template: `
  <h1>
    {{title}}
  </h1>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DownloadOne works!';
}
