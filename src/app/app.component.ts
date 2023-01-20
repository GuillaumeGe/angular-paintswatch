import { Component, VERSION } from '@angular/core';
import { ImaginColorsService } from './imagin.colors.service';
import { of, Observable, Subject } from 'rxjs';
import { Paintswatch } from './paintswatch.type';

@Component({
  selector: 'my-app',
  template: `
  <button class="" (click)="fetchColors()">Get Colors</button>

  <sof-paintswatch [paintswatch]="testPaintSwatch1"></sof-paintswatch>
  <sof-paintswatch [paintswatch]="testPaintSwatch2"></sof-paintswatch>
  <sof-paintswatch [paintswatch]="testPaintSwatch3"></sof-paintswatch>
  `,
  styleUrls: ['./app.component.css'],
  providers: [ImaginColorsService],
})
export class AppComponent {
  paintswatches$ = new Subject<any>();
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
  ];

  testPaintSwatch1: Paintswatch = {
    colors: [
      {
        baseColorRGBCode: '#aeaead',
        highColorRGBCode: '#abacb1',
      },
    ],
    manufacturerNames: ['4d4d', '7867fdg'],
    description: 'Grey',
  };

  testPaintSwatch2: Paintswatch = {
    colors: [
      {
        baseColorRGBCode: '#1b0d11',
        highColorRGBCode: '#a03c59',
      },
    ],
    manufacturerNames: ['3a3a'],
    description: 'Aubergine',
  };

  testPaintSwatch3: Paintswatch = {
    colors: [
      {
        baseColorRGBCode: '#071572',
        highColorRGBCode: '#4462b2',
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
    this.response$ = this.imaginColorService.getPaintSwatches(
      this.brand,
      this.milesColorIDs
    );
    this.response$.subscribe((x) => console.log(x));
  }

  getColorIDs() {
    return this.imaginColorService.availableColorCodes;
  }
}
