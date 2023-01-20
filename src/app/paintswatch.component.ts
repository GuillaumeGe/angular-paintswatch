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
  [title]="this.title">
  </button>`,
  styleUrls: ['./paintswatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaintSwatchComponent {
  c1 = 'transparent';
  c2 = 'transparent';
  c3 = 'transparent';
  c4 = 'transparent';
  className: 'unknown-color' | 'mono-color' | 'dual-color' = 'unknown-color';
  title = 'Color preview may not be available from provider';

  @Input() set paintswatch(value: Paintswatch) {
    this.className = 'unknown-color';

    if (value.colors.length >= 1) {
      //mono color
      this.className = 'mono-color';
      const c = value.colors[0];
      this.c1 = c.baseColorRGBCode;
      if (c.highLightColorRGBCode !== undefined) {
        this.c2 = c.highLightColorRGBCode;
      }
    } else if (value.colors.length >= 2) {
      //dual colors
      this.className = 'dual-color';
      const c = value.colors[1];
      this.c3 = c.baseColorRGBCode;
      if (c.highLightColorRGBCode !== undefined) {
        this.c4 = c.highLightColorRGBCode;
      }
    } else {
      this.title = '';
    }
  }

  constructor() {}
}
