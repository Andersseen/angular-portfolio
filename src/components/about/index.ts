import BaseComponent from '@/shared/base.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import FlickeringGridComponent from '../flickering-grid';

@Component({
  selector: 'app-about',
  imports: [FlickeringGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-flickering-grid />
  `,
})
export default class AboutComponent extends BaseComponent {}
