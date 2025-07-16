import { Dictionaries } from '@/services/dictionaries';
import { ThemeService } from '@/services/theme.service';
import { Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  template: '',
})
export default abstract class Base {
  #contentService = inject(Dictionaries);
  #themeService = inject(ThemeService);
  #portfolioService = inject(PortfolioService);

  public portfolio = this.#portfolioService;
  public getText = computed(() => this.#contentService.getContent());

  public currentTheme = this.#themeService.theme;
  public isDarkTheme = computed(() => this.currentTheme() === 'dark');

  getContent(): any {
    return this.#contentService.getContent();
  }
}
