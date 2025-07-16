import Dock from '@/components/dock';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Footer from './footer';

@Component({
  selector: 'app-pages',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, RouterModule, Footer, Dock],
  template: `
    <main class="relative h-screen w-screen" [ngClass]="'pages-' + direction()">
      <router-outlet />
      @if (showFooter()) {
        <footer
          class="bg-background absolute bottom-0 left-0 z-20 w-full"
          [ngClass]="animatingOut() ? 'footer-leave' : 'footer-enter'"
        >
          <app-footer />
        </footer>
      }
    </main>
    <app-dock (navigateTo)="navigateTo($event)" />
  `,
  styles: [
    `
      main.pages-down {
        view-transition-name: pages-down;
      }
      main.pages-up {
        view-transition-name: pages-up;
      }
      .footer-enter {
        animation: footerIn 0.4s ease-out forwards;
        opacity: 0;
        transform: translateY(100%);
      }

      .footer-leave {
        animation: footerOut 0.4s ease-in forwards;
      }

      @keyframes footerIn {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes footerOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(100%);
        }
      }
    `,
  ],
})
export default class Pages {
  private router = inject(Router);

  public direction = signal<'up' | 'down'>('down');
  private scrollTimeout: any = null;
  private lastTouchY: number | null = null;
  public showFooter = signal(false);
  public animatingOut = signal(false);

  public sectionList = [
    { path: 'hero', label: 'Hero' },
    { path: 'about', label: 'About' },
    { path: 'projects', label: 'Projects' },
    { path: 'contact', label: 'Contact' },
  ];

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    this.handleScroll(event.deltaY);
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.lastTouchY === null) {
      this.lastTouchY = event.touches[0].clientY;
      return;
    }
    const deltaY = this.lastTouchY - event.touches[0].clientY;
    this.handleScroll(deltaY);
    this.lastTouchY = event.touches[0].clientY;
  }

  @HostListener('window:touchend')
  onTouchEnd() {
    this.lastTouchY = null;
  }

  private handleScroll(deltaY: number) {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

    this.scrollTimeout = setTimeout(() => {
      this.navigateScroll(deltaY > 0 ? 'down' : 'up');
    }, 100);
  }

  private navigateScroll(dir: 'up' | 'down') {
    const index = this.currentIndex;
    this.direction.set(dir);

    if (dir === 'down') {
      if (index < this.sectionList.length - 1) {
        this.navigateTo(this.sectionList[index + 1].path);
      } else {
        this.showFooter.set(true);
      }
    }
    if (dir === 'up' && index > 0) {
      if (this.showFooter()) {
        this.animatingOut.set(true);
        setTimeout(() => {
          this.showFooter.set(false);
          this.animatingOut.set(false);
        }, 400);
        return;
      }
      this.navigateTo(this.sectionList[index - 1].path);
    }
  }

  private get currentIndex(): number {
    const url = this.router.url.replace('/', '');

    return this.sectionList.findIndex((s) => s.path === url);
  }

  navigateTo(path: string) {
    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => this.router.navigate([path]));
    } else {
      this.router.navigate([path]);
    }
  }
}
