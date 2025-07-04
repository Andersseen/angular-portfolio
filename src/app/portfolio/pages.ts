import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { slideBounceAnimation } from './slide-bounce-directional.animation';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule],
  animations: [slideBounceAnimation],
  template: `
    <div class="relative h-screen overflow-hidden">
      <!-- HEADER -->
      <div class="absolute top-0 right-0 left-0 z-50">
        <div class="flex h-16 items-center justify-center bg-black text-white">HEADER</div>
      </div>

      <!-- SECTIONS -->
      <ng-container *ngFor="let section of sections; let i = index">
        <div
          *ngIf="i === currentSection()"
          [@slideBounce]="direction()"
          class="absolute top-0 left-0 flex h-screen w-full items-center justify-center transition-all"
          [ngClass]="{
            'bg-blue-100': i === 0,
            'bg-green-100': i === 1,
            'bg-yellow-100': i === 2,
            'bg-black text-white': i === 3,
          }"
        >
          <h1 class="text-5xl font-bold">{{ section.content }}</h1>
        </div>
      </ng-container>

      <!-- FOOTER -->
      <footer
        *ngIf="showFooter()"
        @slideBounce
        class="absolute right-0 bottom-0 left-0 flex h-screen items-center justify-center bg-neutral-900 text-4xl text-white"
      >
        FOOTER 🎉
      </footer>

      <!-- SECTION JUMP NAV -->
      <div class="fixed right-6 bottom-6 z-50 flex flex-col gap-4">
        <button class="rounded bg-black px-4 py-2 text-white" *ngFor="let i of [0, 1, 2, 3]" (click)="goTo(i)">
          Ir a {{ i + 1 }}
        </button>
      </div>
    </div>
  `,
})
export default class Pages {
  currentSection = signal(0);
  direction = signal<'up' | 'down'>('down');
  showFooter = signal(false);
  footerScroll = signal(false);

  readonly sections = [
    { content: 'NoiseBloom' },
    { content: 'About' },
    { content: 'Projects' },
    { content: 'Contact' },
  ];

  private destroyRef = inject(DestroyRef);
  private scrollTimeout: any = null;
  private lastTouchY: number | null = null;

  constructor() {
    effect(() => {
      const wheelHandler = (e: WheelEvent) => this.handleScroll(e.deltaY);
      const touchMoveHandler = (e: TouchEvent) => {
        if (this.lastTouchY === null) {
          this.lastTouchY = e.touches[0].clientY;
          return;
        }
        const deltaY = this.lastTouchY - e.touches[0].clientY;
        this.handleScroll(deltaY);
        this.lastTouchY = e.touches[0].clientY;
      };
      const touchEndHandler = () => (this.lastTouchY = null);

      window.addEventListener('wheel', wheelHandler);
      window.addEventListener('touchmove', touchMoveHandler);
      window.addEventListener('touchend', touchEndHandler);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('wheel', wheelHandler);
        window.removeEventListener('touchmove', touchMoveHandler);
        window.removeEventListener('touchend', touchEndHandler);
        if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      });
    });
  }

  private handleScroll(deltaY: number) {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      if (deltaY > 0) {
        this.scrollDown();
      } else {
        this.scrollUp();
      }
    }, 100);
  }

  private scrollDown() {
    this.direction.set('down');
    if (this.currentSection() < this.sections.length - 1) {
      this.currentSection.update((i) => i + 1);
      this.showFooter.set(false);
    } else {
      this.showFooter.set(true);
    }
  }

  private scrollUp() {
    this.direction.set('up');
    if (this.showFooter()) {
      if (this.footerScroll()) {
        this.footerScroll.set(false);
        this.showFooter.set(false);
        return;
      }
      this.footerScroll.set(true);
    } else if (this.currentSection() > 0) {
      this.currentSection.update((i) => i - 1);
    }
  }

  goTo(index: number) {
    const current = this.currentSection();
    this.direction.set(index > current ? 'down' : 'up');
    this.currentSection.set(index);
    this.showFooter.set(false);
    this.footerScroll.set(false);
  }
}
