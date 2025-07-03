import { Component, inject } from '@angular/core';
import { ContentService } from '../services/content.service';
import { LanguageService } from '../services/language.service';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  template: '',
})
export default abstract class BaseComponent {
  #languageService = inject(LanguageService);
  #contentService = inject(ContentService);
  public portfolioService = inject(PortfolioService);

  getContent(): any {
    return this.#contentService.getContent(this.#languageService.language());
  }
}
