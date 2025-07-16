import Base from '@/shared/base';
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
      <div class="bg-foreground/20 flex h-[70px] items-center gap-2 rounded-2xl px-4">
        @for (item of sectionList(); track $index; let i = $index) {
          <div
            class="relative flex cursor-pointer flex-col items-center transition-all duration-300 ease-out"
            [style.width.px]="getItemSize(i)"
            [style.height.px]="getItemSize(i)"
            (click)="navigateTo.emit(item.path)"
            (mouseenter)="hoveredIndex = i"
            (mouseleave)="hoveredIndex = null"
          >
            <div
              class="flex h-full w-full items-center justify-center rounded-full transition-all duration-300"
              [ngClass]="{
                'bg-background': isCurrentSection(item.path),
                'bg-background/50 hover:bg-primary/50': !isCurrentSection(item.path),
              }"
            >
              @switch (item.path) {
                @case ('hero') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                }
                @case ('about') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                    />
                  </svg>
                }
                @case ('projects') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
                    />
                  </svg>
                }
                @case ('blog') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
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
                @case ('services') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                }
                @case ('portfolio') {
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM8 17h2v-7H8v7zm4 0h2V7h-2v10zm4 0h2v-4h-2v4z" />
                  </svg>
                }
              }
            </div>
            @if (hoveredIndex === i) {
              <div
                class="bg-foreground text-background absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-md px-3 py-1 text-xs transition-all duration-300 group-hover:opacity-100"
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
export default class Dock extends Base implements OnInit {
  public mouseX = 0;
  public hoveredIndex: number | null = null;
  public baseSize = 48;
  public maxSize = 64;
  public router = inject(Router);
  public currentRoute = signal(this.clearPath(this.router.url));

  public navigateTo = output<string>();
  public sectionList = signal([
    { path: 'hero', label: this.getTextInDock()[0] },
    { path: 'about', label: this.getTextInDock()[1] },
    { path: 'projects', label: this.getTextInDock()[2] },
    { path: 'contact', label: this.getTextInDock()[3] },
  ]);
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
