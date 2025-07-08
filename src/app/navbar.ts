import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  template: `
    <nav class="dock fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-3">
      @for (section of sectionList; track $index) {
        <button
          class="dock-icon aspect-square w-10 rounded-full transition-all duration-500 ease-in-out hover:scale-[1.5] md:w-12"
          (click)="navigateTo.emit(section.path)"
          [ngClass]="{
            'bg-neutral-900 dark:bg-neutral-700': isCurrentSection(section.path),
            'bg-neutral-700 dark:bg-neutral-900': !isCurrentSection(section.path),
          }"
        >
          {{ section.label[0] }}
        </button>
      }
    </nav>
  `,
  styles: [
    `
      .dock {
        view-transition-name: navbar;
        transition: all 0.3s ease-in-out;
        padding: 0.25rem 1rem;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 9999px;
        backdrop-filter: blur(12px);
      }

      .dock-icon {
        transition: transform 0.3s ease;
        will-change: transform;
        color: white;
        font-weight: bold;
        text-align: center;
        line-height: 2.5rem;
      }

      .dock-icon:hover {
        z-index: 20;
      }

      .dock:hover .dock-icon {
        transform: scale(0.9);
      }
    `,
  ],
})
export default class Navbar implements OnInit {
  public router = inject(Router);
  public currentRoute = signal(this.clearPath(this.router.url));

  public navigateTo = output<string>();
  public sectionList = [
    { path: 'hero', label: 'Hero' },
    { path: 'about', label: 'About' },
    { path: 'projects', label: 'Projects' },
    { path: 'contact', label: 'Contact' },
  ];
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(this.clearPath(event.urlAfterRedirects));
      }
    });
  }
  private clearPath(path: string) {
    return path.split('/').pop() || '';
  }
  public isCurrentSection(section: string) {
    return this.currentRoute() === section;
  }
}
