import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  template: `
    <section class="transition-fixed top-5 right-5 z-50">
      <button
        (click)="toggleDropdown()"
        class="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
      >
        <span class="text-lg">{{ getCurrentLanguage().flag }}</span>
        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {{ getCurrentLanguage().code.toUpperCase() }}
        </span>
        <svg
          class="h-4 w-4 transform text-neutral-500 transition-transform duration-200 dark:text-neutral-400"
          [class.rotate-180]="isOpen"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      @if (isOpen) {
        <div
          class="animate-slide-down absolute top-full right-0 mt-2 w-48 rounded-xl border border-neutral-200 bg-neutral-50 py-2 shadow-xl backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800"
        >
          @for (lang of languageService.getLanguages(); track $index) {
            <button
              (click)="selectLanguage(lang.code)"
              class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl hover:bg-neutral-100 dark:hover:bg-neutral-700"
              [class.bg-neutral-100]="lang.code === languageService.language()"
              [class.dark:bg-neutral-700]="lang.code === languageService.language()"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ lang.name }}</span>
                <span class="text-xs text-neutral-500 dark:text-neutral-400">{{ lang.code.toUpperCase() }}</span>
              </div>
              @if (lang.code === languageService.language()) {
                <svg class="ml-auto h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              }
            </button>
          }
        </div>
      }
    </section>
  `,
  styles: [
    `
      .transition-fixed {
        position: fixed;
        view-transition-name: language-switcher;
      }
    `,
  ],
})
export class LanguageSwitcherComponent {
  public languageService = inject(LanguageService);
  public isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: any) {
    this.languageService.setLanguage(lang);
    this.isOpen = false;
  }

  getCurrentLanguage() {
    return this.languageService.getCurrentLanguageInfo();
  }
}
