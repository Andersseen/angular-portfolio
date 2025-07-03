import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { LanguageSwitcherComponent } from '../components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ThemeSwitcherComponent, LanguageSwitcherComponent],
  template: `
    <nav class="fixed top-0 right-0 left-0 z-50 transition-all duration-300" [class]="navbarClasses()">
      <div class="container-custom">
        <div class="flex h-16 items-center justify-between">
          <app-theme-switcher />

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a
                *ngFor="let item of navItems"
                [href]="item.href"
                class="hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 dark:text-gray-300"
                [class.text-primary-600]="activeSection() === item.section"
                [class.dark:text-primary-400]="activeSection() === item.section"
              >
                {{ item.label }}
              </a>
            </div>
          </div>

          <!-- i18n-->

          <div class="flex items-center space-x-4">
            <app-language-switcher />
            <!-- Mobile menu button -->
            <button
              (click)="toggleMobileMenu()"
              class="rounded-lg bg-gray-100 p-2 text-gray-600 md:hidden dark:bg-gray-800 dark:text-gray-300"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        @if (isMobileMenuOpen()) {
          <div>
            <div
              class="space-y-1 border-t border-gray-200 bg-white px-2 pt-2 pb-3 dark:border-gray-700 dark:bg-gray-900"
            >
              <a
                *ngFor="let item of navItems"
                [href]="item.href"
                (click)="closeMobileMenu()"
                class="hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 dark:text-gray-300"
                [class.text-primary-600]="activeSection() === item.section"
                [class.dark:text-primary-400]="activeSection() === item.section"
              >
                {{ item.label }}
              </a>
            </div>
          </div>
        }
      </div>
    </nav>
  `,
})
export default class Navbar implements OnInit, OnDestroy {
  private scrollListener!: () => void;

  public isScrolled = signal(false);
  public isDarkMode = signal(false);
  public isMobileMenuOpen = signal(false);
  public activeSection = signal('home');

  navItems = [
    { label: 'Home', href: 'home#home', section: 'home' },
    { label: 'About', href: 'home#about', section: 'about' },
    { label: 'Skills', href: 'home#skills', section: 'skills' },
    { label: 'Projects', href: 'home#projects', section: 'projects' },
    { label: 'Contact', href: 'home#contact', section: 'contact' },
  ];

  navbarClasses() {
    return this.isScrolled() ? 'bg-transparent/70 backdrop-blur-sm shadow-lg' : 'bg-transparent';
  }

  ngOnInit() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }

    // Setup scroll listener
    this.scrollListener = () => {
      this.isScrolled.set(window.scrollY > 50);
      this.updateActiveSection();
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  toggleTheme() {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  private updateActiveSection() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }
}
