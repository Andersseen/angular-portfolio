import en from '@/assets/data/en.json';
import es from '@/assets/data/es.json';
import ua from '@/assets/data/ua.json';
import { ContentData } from '@/shared/portfolio.types';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
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
