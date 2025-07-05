import content from '@/assets/data/content.json';
import { ContentData, Language } from '@/shared/portfolio.types';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentData = signal<Record<Language, ContentData> | null>(null);

  readonly content = this.contentData.asReadonly();

  constructor() {
    this.loadContent();
  }

  private async loadContent() {
    this.contentData.set(content);
  }

  getContent(language: Language): ContentData | null {
    const content = this.contentData();
    return content ? content[language] : null;
  }
}
