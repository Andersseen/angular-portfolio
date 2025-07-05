import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="relative h-screen w-screen overflow-hidden bg-white text-black">
      <router-outlet />

      <div class="fixed right-6 bottom-6 z-50 flex flex-col gap-2">
        <button
          *ngFor="let section of sectionList"
          class="rounded bg-black px-4 py-2 text-white"
          (click)="navigateTo(section.path)"
        >
          Ir a {{ section.label }}
        </button>
      </div>
    </main>
  `,
  styles: [``],
})
export class PagesComponent {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  sectionList = [
    { path: 'home/hero', label: 'Hero' },
    { path: 'home/about', label: 'About' },
    { path: 'home/projects', label: 'Projects' },
    { path: 'home/contact', label: 'Contact' },
  ];

  private scrollTimeout: any = null;
  private lastTouchY: number | null = null;

  constructor() {
    // Listen to wheel and touch
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
      this.navigateScroll(deltaY > 0 ? 'down' : 'up');
    }, 100);
  }

  private get currentIndex(): number {
    const url = this.router.url.replace('/', '');
    return this.sectionList.findIndex((s) => s.path === url);
  }

  private navigateScroll(direction: 'up' | 'down') {
    const index = this.currentIndex;

    if (direction === 'down' && index < this.sectionList.length - 1) {
      this.navigateTo(this.sectionList[index + 1].path);
    } else if (direction === 'up' && index > 0) {
      this.navigateTo(this.sectionList[index - 1].path);
    }
  }

  navigateTo(path: string) {
    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => this.router.navigate([path]));
    } else {
      this.router.navigate([path]);
    }
  }
}
