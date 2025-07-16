import Base from '@/shared/base.component';
import { NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import FlickeringGrid from './flickering-grid';

@Component({
  selector: 'app-about',
  imports: [NgStyle, FlickeringGrid],
  template: `
    <div #container class="relative h-screen w-full overflow-hidden bg-black">
      <!-- Flickering Grid Canvas Background -->
      <app-flickering-grid
        class="absolute inset-0 z-0 size-full"
        [squareSize]="4"
        [gridGap]="6"
        [color]="isDarkTheme() ? '#a3a3a3' : '#fff'"
        [maxOpacity]="0.5"
        [flickerChance]="0.1"
      >
        <!-- Masked content with reveal effect -->
        <div
          [ngStyle]="{
            'mask-image': 'url(mask.svg)',
            '-webkit-mask-image': 'url(mask.svg)',
            'mask-size': maskSize(),
            '-webkit-mask-size': maskSize(),
            'mask-position': maskPosition(),
            '-webkit-mask-position': maskPosition(),
            'mask-repeat': 'no-repeat',
            '-webkit-mask-repeat': 'no-repeat',
          }"
          class="bg-background absolute inset-0 z-10 flex h-full w-full items-center justify-center transition-[mask-size] duration-300 ease-in-out"
        >
          <!-- Overlay to darken background slightly -->
          <div class="absolute inset-0 z-0 bg-neutral-900 opacity-50"></div>

          <!-- Hidden Content -->
          <div class="relative z-10 max-w-4xl px-6 text-center text-white">
            <p class="max-w-3xl px-4 text-center text-3xl font-bold md:text-5xl">
              ...but I'm busy working out bugs and creating cool stuff.
            </p>

            <p class="text-[--main-color]">
              @for (char of animatedText; track $index) {
                <span
                  [ngStyle]="{
                    'text-shadow':
                      hoveredChar === $index ? '-2px 2px rgba(245,245,245,0.7)' : '1px -1px rgba(248,248,248,0.5)',
                    transform: hoveredChar === $index ? 'scale(1.1)' : 'scale(1)',
                    display: char === ' ' ? 'inline-block' : 'inline',
                    transition: 'all 0.3s ease-in-out',
                  }"
                  (mouseenter)="hoveredChar = $index"
                  (mouseleave)="hoveredChar = null"
                >
                  {{ char }}
                </span>
              }
            </p>
          </div>
        </div>

        <!-- Revealed content -->
        <div class="absolute inset-0 flex items-center justify-center">
          <p #box class="max-w-3xl px-4 text-center text-3xl font-bold md:text-5xl">
            Here should be an in-depth text about my passion for coding...
          </p>
        </div>
      </app-flickering-grid>
    </div>
  `,
})
export default class About extends Base implements AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef<HTMLElement>;
  public box = viewChild<ElementRef<HTMLElement>>('box');

  public isHovered = signal(false);
  public mouseX = signal(0);
  public mouseY = signal(0);
  public hoveredChar: number | null = null;

  public animatedText = Array.from('Interactive Angular is powerful!');

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    this.mouseX.set(e.clientX - rect.left);
    this.mouseY.set(e.clientY - rect.top);
    this.isHovered.set(this.isInsideBox(e.clientX, e.clientY));
  }

  private isInsideBox(x: number, y: number): boolean {
    const boxRect = this.box()!.nativeElement.getBoundingClientRect();
    return x >= boxRect.left && x <= boxRect.right && y >= boxRect.top && y <= boxRect.bottom;
  }

  public maskPosition = computed(() => {
    const size = this.isHovered() ? 600 : 100;
    return `${this.mouseX() - size / 2}px ${this.mouseY() - size / 2}px`;
  });

  public maskSize = computed(() => (this.isHovered() ? '600px' : '1px'));

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.onMouseMove(new MouseEvent('mousemove')));
  }
}
