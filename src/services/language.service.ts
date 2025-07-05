import { Language, LanguageOption } from '@/shared/portfolio.types';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = signal<Language>('en');

  readonly languages: LanguageOption[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ua', name: 'Українська', flag: '🇺🇦' },
  ];

  readonly language = this.currentLanguage.asReadonly();

  constructor() {
    // Load language from localStorage or browser preference
    this.initializeLanguage();
  }

  private initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;

    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.currentLanguage.set(savedLanguage);
    } else if (this.isValidLanguage(browserLanguage)) {
      this.currentLanguage.set(browserLanguage);
    }
  }

  private isValidLanguage(lang: string): lang is Language {
    return ['en', 'es', 'ua'].includes(lang);
  }

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
  }

  getLanguages() {
    return this.languages;
  }

  getCurrentLanguageInfo() {
    return this.languages.find((lang) => lang.code === this.currentLanguage()) || this.languages[0];
  }
}
