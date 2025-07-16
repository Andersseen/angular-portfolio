import { ThemeService } from '@/services/theme.service';
import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../services/content.service';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  template: '',
})
export default abstract class Base {
  #contentService = inject(ContentService);
  #themeService = inject(ThemeService);
  #portfolioService = inject(PortfolioService);

  public portfolio = this.#portfolioService;

  public currentTheme = this.#themeService.theme;
  public isDarkTheme = computed(() => this.currentTheme() === 'dark');

  getContent(): any {
    return this.#contentService.getContent();
  }
}
