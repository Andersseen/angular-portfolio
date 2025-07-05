import { Theme } from '@/shared/portfolio.types';
import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = signal<Theme>('light');

  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    // Load theme from localStorage or system preference
    this.initializeTheme();

    // Apply theme changes to document
    effect(() => {
      console.log(`Applying theme: ${this.currentTheme()}`);

      this.applyTheme(this.currentTheme());
    });
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else if (systemPrefersDark) {
      this.currentTheme.set('dark');
    }
  }

  private applyTheme(theme: Theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';

    this.currentTheme.set(newTheme);
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }
}
