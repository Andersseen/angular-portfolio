import en from '@/assets/dictionaries/en.json';
import es from '@/assets/dictionaries/es.json';
import ua from '@/assets/dictionaries/ua.json';
import { type ContentData } from '@/shared/types';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class Dictionaries {
  #language = inject(LanguageService).language;
  private contentData = signal<ContentData>(en);
  readonly getContent = this.contentData.asReadonly();

  #getLanguage = {
    en: () => this.contentData.set(en),
    es: () => this.contentData.set(es),
    ua: () => this.contentData.set(ua),
  };

  constructor() {
    effect(() => {
      this.#getLanguage[this.#language()]();
    });
  }
}
