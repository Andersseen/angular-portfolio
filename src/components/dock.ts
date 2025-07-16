import { NgClass } from '@angular/common';
import { Component, inject, OnInit, output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dock',
  imports: [NgClass],
  template: `
    <div
      class="dock fixed right-0 bottom-0 left-0 z-50 flex justify-center p-4 backdrop-blur-[1px]"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
    >
      <div class="bg-foreground/20 flex h-[70px] items-center gap-2 rounded-xl px-4">
        @for (item of sectionList; track $index; let i = $index) {
          <div
            class="relative flex cursor-pointer flex-col items-center transition-all duration-300 ease-out"
            [style.width.px]="getItemSize(i)"
            [style.height.px]="getItemSize(i)"
            (click)="navigateTo.emit(item.path)"
            (mouseenter)="hoveredIndex = i"
            (mouseleave)="hoveredIndex = null"
          >
            <div
              class="flex h-full w-full items-center justify-center rounded-xl transition-all duration-300"
              [ngClass]="{
                'bg-background': isCurrentSection(item.path),
                'bg-background/50 hover:bg-primary/50': !isCurrentSection(item.path),
              }"
            >
              @switch (item.path) {
                @case ('hero') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.715-12.29l-6-6c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414L14.586 12l-5.295 5.293c-.39.39-.39 1.024 0 1.414.39.39 1.024.39 1.414 0l6-6c.39-.39.39-1.024 0-1.414z"
                    />
                  </svg>
                }
                @case ('about') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.716 15.884c.16.16.16.4 0 .56l-1.272 1.272c-.16.16-.4.16-.56 0l-4.884-4.884-4.884 4.884c-.16.16-.4.16-.56 0l-1.272-1.272c-.16-.16-.16-.4 0-.56l4.884-4.884-4.884-4.884c-.16-.16-.16-.4 0-.56l1.272-1.272c.16-.16.4-.16.56 0l4.884 4.884 4.884-4.884c.16-.16.4-.16.56 0l1.272 1.272c.16.16.16.4 0 .56l-4.884 4.884 4.884 4.884z"
                    />
                  </svg>
                }
                @case ('projects') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                    />
                  </svg>
                }
                @case ('contact') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    />
                  </svg>
                }
              }
            </div>

            @if (hoveredIndex === i) {
              <div
                class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-md bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
                [class.animate-bounce]="hoveredIndex === i"
              >
                {{ item.label }}
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .dock {
        view-transition-name: navbar;
      }
    `,
  ],
})
export default class Dock implements OnInit {
  public mouseX = 0;
  public hoveredIndex: number | null = null;
  public baseSize = 48;
  public maxSize = 64;
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

  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
  }

  onMouseLeave() {
    this.mouseX = 0;
    this.hoveredIndex = null;
  }

  getItemSize(index: number): number {
    if (this.hoveredIndex === index) return this.maxSize;
    if (this.hoveredIndex === null) return this.baseSize;

    const distance = Math.abs(index - (this.hoveredIndex || 0));
    return this.baseSize + (this.maxSize - this.baseSize) * (1 - distance * 0.3);
  }
}
