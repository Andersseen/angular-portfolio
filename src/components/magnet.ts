import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  Input,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-magnet',
  imports: [NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #magnetRef style="position: fixed;z-index:100; display: inline-block;padding:1rem;">
      <div
        [class]="innerClass"
        [ngStyle]="{
          transform: transform(),
          transition: transition(),
          willChange: 'transform',
        }"
      >
        <ng-content />
      </div>
    </div>
  `,
})
export default class Magnet {
  public magnetRef = viewChild<ElementRef<HTMLElement>>('magnetRef');

  @Input() padding = 100;
  @Input() disabled = false;
  @Input() magnetStrength = 2;
  @Input() activeTransition = 'transform 0.3s ease-out';
  @Input() inactiveTransition = 'transform 0.5s ease-in-out';
  @Input() wrapperClass = '';
  @Input() innerClass = '';

  private isActive = signal(false);
  private offsetX = signal(0);
  private offsetY = signal(0);
  public transform = computed(() => {
    return `translate3d(${this.offsetX()}px, ${this.offsetY()}px, 0)`;
  });

  public transition = computed(() => {
    return this.isActive() ? this.activeTransition : this.inactiveTransition;
  });

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.disabled || !this.magnetRef) return;

    const rect = this.magnetRef()!.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = Math.abs(centerX - e.clientX);
    const distY = Math.abs(centerY - e.clientY);

    if (distX < rect.width / 2 + this.padding && distY < rect.height / 2 + this.padding) {
      this.isActive.set(true);
      this.offsetX.set((e.clientX - centerX) / this.magnetStrength);
      this.offsetY.set((e.clientY - centerY) / this.magnetStrength);
    } else {
      this.isActive.set(false);
      this.offsetX.set(0);
      this.offsetY.set(0);
    }
  }
}
