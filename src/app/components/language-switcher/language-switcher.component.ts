import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50">
      <div class="relative">
        <button 
          (click)="toggleDropdown()"
          class="flex items-center gap-2 px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:scale-105"
        >
          <span class="text-lg">{{ getCurrentLanguage().flag }}</span>
          <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ getCurrentLanguage().code.toUpperCase() }}</span>
          <svg class="w-4 h-4 text-neutral-500 dark:text-neutral-400 transform transition-transform duration-200" 
               [class.rotate-180]="isOpen" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <div *ngIf="isOpen" 
             class="absolute top-full right-0 mt-2 w-48 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 py-2 animate-slide-down backdrop-blur-sm">
          <button 
            *ngFor="let lang of languageService.getLanguages()"
            (click)="selectLanguage(lang.code)"
            class="w-full px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl"
            [class.bg-neutral-100]="lang.code === languageService.language()"
            [class.dark:bg-neutral-700]="lang.code === languageService.language()"
          >
            <span class="text-lg">{{ lang.flag }}</span>
            <div class="flex flex-col">
              <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ lang.name }}</span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400">{{ lang.code.toUpperCase() }}</span>
            </div>
            <svg *ngIf="lang.code === languageService.language()" 
                 class="w-4 h-4 text-blue-500 ml-auto" 
                 fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class LanguageSwitcherComponent {
  languageService = inject(LanguageService);
  isOpen = false;

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