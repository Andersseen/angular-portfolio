import { Component, inject } from '@angular/core';
import { ContentService } from '../services/content.service';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  template: '',
})
export default abstract class BaseComponent {
  #contentService = inject(ContentService);
  public portfolioService = inject(PortfolioService);

  getContent(): any {
    return this.#contentService.getContent();
  }
}
