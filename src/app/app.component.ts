import { Component, VERSION } from '@angular/core';
import { ImaginColorsService } from './imagin.colors.service';
import { of, Observable, Subject } from 'rxjs';
import { Paintswatch } from './paintswatch.type';

@Component({
  selector: 'my-app',
  template: `
  <button class="" (click)="fetchColors()">Get Colors</button>
  <br>
  <sof-paintswatch *ngFor="let paintswatch of this.paintswatches$ | async;" [paintswatch]="paintswatch"></sof-paintswatch>
  <sof-paintswatch></sof-paintswatch>
  <sof-paintswatch [paintswatch]="testPaintSwatch2" [selected]="true"></sof-paintswatch>
  <sof-paintswatch [paintswatch]="testPaintSwatch1" [selected]="true"></sof-paintswatch>
  `,
  styleUrls: ['./app.component.css'],
  providers: [ImaginColorsService],
})
export class AppComponent {
  paintswatches$: Observable<Paintswatch[]>;
  response$: Observable<any>;

  milesColorIDs = [
    'y5y5',
    'a2a2',
    'u4u4',
    'y56y',
    'n9p5',
    'l8p5',
    's9p5',
    '3ap5',
    '9FA2',
    '4uy5',
    '6y6y',
    'p5p5',
    'n9n9',
    'l8l8',
    's9s9',
    '3a3a',
    'n90e',
  ];

  testPaintSwatch1: Paintswatch = {
    colors: [
      {
        baseColorRGBCode: '#b40f14',
        highLightColorRGBCode: '#ac0a0e',
      },
      {
        baseColorRGBCode: '#000000',
        highLightColorRGBCode: '#131313',
      },
    ],
    manufacturerNames: ['n90e'],
    description: 'Bi color',
  };

  testPaintSwatch2: Paintswatch = {
    colors: [
      {
        baseColorRGBCode: '#071572',
        highLightColorRGBCode: '#4462b2',
      },
    ],
    manufacturerNames: ['s9s9'],
    description: 'Cumulus Blue',
  };

  brand = 'audi';

  constructor(private imaginColorService: ImaginColorsService) {}

  testFunction() {
    console.log('test');
  }

  fetchColors() {
    this.paintswatches$ = this.imaginColorService.getPaintSwatches(
      this.brand,
      this.milesColorIDs
    );
    this.paintswatches$.subscribe((x) => console.log(x));
  }

  getColorIDs() {
    return this.imaginColorService.availableColorCodes;
  }
}
