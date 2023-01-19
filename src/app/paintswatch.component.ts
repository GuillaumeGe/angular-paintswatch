import { style } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'sof-paintswatch',
  template: `<div
  </div>`,
  styleUrls: ['./paintswatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaintSwatchComponent {
  @Input() backgroundColor: string;
  @Input() foregroundColor: string;

  @HostBinding('style.--color1') color1: string;
  @HostBinding('style.--color2') color2: string;

  constructor() {
    console.log('created');
  }
}
