import { ThemeService } from '@/services/theme.service';
import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../services/content.service';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  template: '',
})
export default abstract class BaseComponent {
  #contentService = inject(ContentService);
  #themeService = inject(ThemeService);
  public portfolioService = inject(PortfolioService);

  public currentTheme = this.#themeService.theme;
  public isDarkTheme = computed(() => this.currentTheme() === 'dark');

  getContent(): any {
    return this.#contentService.getContent();
  }
}
