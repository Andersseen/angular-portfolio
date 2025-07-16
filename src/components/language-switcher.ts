import { LanguageService } from '@/services/language.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="transition-fixed">
      <button
        (click)="toggleDropdown()"
        class="border-foreground/30 bg-background flex items-center gap-2 rounded-full border px-4 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <span class="text-lg">{{ getCurrentLanguage().flag }}</span>
        <span class="text-sm font-medium">
          {{ getCurrentLanguage().code.toUpperCase() }}
        </span>
        <svg
          class="d h-4 w-4 transform transition-transform duration-200"
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
          class="animate-slide-down border-foreground/30 bg-background absolute top-full left-0 mt-2 w-48 rounded-xl border py-2 shadow-xl backdrop-blur-sm"
        >
          @for (lang of languageService.getLanguages(); track $index) {
            <button
              (click)="selectLanguage(lang.code)"
              class="hover:bg-foreground/50 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
              [class.bg-neutral-100]="lang.code === languageService.language()"
              [class.dark:bg-neutral-700]="lang.code === languageService.language()"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <div class="flex flex-col">
                <span class="text-sm font-medium">{{ lang.name }}</span>
                <span class="text-foreground/50 text-xs">{{ lang.code.toUpperCase() }}</span>
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
export default class LanguageSwitcher {
  public languageService = inject(LanguageService);
  public isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: any) {
    this.languageService.setLanguage(lang);
    this.isOpen = false;
    window.location.reload();
  }

  getCurrentLanguage() {
    return this.languageService.getCurrentLanguageInfo();
  }
}
