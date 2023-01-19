import { Component, VERSION } from '@angular/core';
import { ImaginColorsService } from './imagin.colors.service';

@Component({
  selector: 'my-app',
  template: `
  <sof-paintswatch>Hello</sof-paintswatch>
  `,
  styleUrls: ['./app.component.css'],
  providers: [ImaginColorsService],
})
export class AppComponent {}
