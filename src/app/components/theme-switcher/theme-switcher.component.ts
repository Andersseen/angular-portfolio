import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="themeService.toggleTheme()"
      class="fixed top-4 left-4 z-50 p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:scale-105"
      [attr.aria-label]="themeService.theme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
    >
      <div class="relative w-6 h-6">
        <!-- Sun icon -->
        <svg 
          class="absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 transform"
          [class.opacity-100]="themeService.theme() === 'light'"
          [class.opacity-0]="themeService.theme() === 'dark'"
          [class.rotate-0]="themeService.theme() === 'light'"
          [class.rotate-90]="themeService.theme() === 'dark'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        
        <!-- Moon icon -->
        <svg 
          class="absolute inset-0 w-6 h-6 text-slate-700 dark:text-slate-300 transition-all duration-300 transform"
          [class.opacity-0]="themeService.theme() === 'light'"
          [class.opacity-100]="themeService.theme() === 'dark'"
          [class.-rotate-90]="themeService.theme() === 'light'"
          [class.rotate-0]="themeService.theme() === 'dark'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
    </button>
  `
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);
}