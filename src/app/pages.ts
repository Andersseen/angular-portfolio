import { NgClass } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Navbar from './navbar';

@Component({
  selector: 'app-pages',
  imports: [NgClass, RouterModule, Navbar],
  template: `
    <main class="relative h-screen w-screen" [ngClass]="'pages-' + direction()">
      <router-outlet />
    </main>
    <app-navbar (navigateTo)="navigateTo($event)" />
  `,
  styles: [
    `
      main.pages-down {
        view-transition-name: pages-down;
      }
      main.pages-up {
        view-transition-name: pages-up;
      }
    `,
  ],
})
export default class Pages {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public direction = signal<'up' | 'down'>('down');

  public sectionList = [
    { path: 'hero', label: 'Hero' },
    { path: 'about', label: 'About' },
    { path: 'projects', label: 'Projects' },
    { path: 'contact', label: 'Contact' },
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

  private navigateScroll(dir: 'up' | 'down') {
    const index = this.currentIndex;
    this.direction.set(dir);

    if (dir === 'down' && index < this.sectionList.length - 1) {
      this.navigateTo(this.sectionList[index + 1].path);
    } else if (dir === 'up' && index > 0) {
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
