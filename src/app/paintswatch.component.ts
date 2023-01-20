import { style } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Paintswatch } from './paintswatch.type';

@Component({
  selector: 'sof-paintswatch',
  template: `<button [class]="this.className" 
  [style.--color1]="this.c1"
  [style.--color2]="this.c2"
  [style.--color3]="this.c3"
  [style.--color4]="this.c4"
  [title]="title">
  </button>`,
  styleUrls: ['./paintswatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaintSwatchComponent {
  c1 = '';
  c2 = '';
  c3 = '';
  c4 = '';
  className: 'unknown-color' | 'mono-color' | 'dual-color' = 'unknown-color';
  title = '';

  @Input() set paintswatch(value: Paintswatch) {
    this.className = 'unknown-color';
    //mono color
    if (value.colors.length >= 1) {
      this.className = 'mono-color';
      const c = value.colors[0];
      this.c1 = c.baseColorRGBCode;
      if (c.highLightColorRGBCode !== undefined) {
        this.c2 = c.highLightColorRGBCode;
      }
    }
    //dual colors
    if (value.colors.length >= 2) {
      this.className = 'dual-color';
      const c = value.colors[1];
      this.c3 = c.baseColorRGBCode;
      if (c.highLightColorRGBCode !== undefined) {
        this.c4 = c.highLightColorRGBCode;
      }
    }
  }

  constructor() {}
}
