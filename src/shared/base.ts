import { Dictionaries } from '@/services/dictionaries';
import { LanguageService } from '@/services/language.service';
import { ThemeService } from '@/services/theme.service';
import { Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  template: '',
})
export default abstract class Base {
  #contentService = inject(Dictionaries);
  #language = inject(LanguageService);
  #themeService = inject(ThemeService);
  #portfolioService = inject(PortfolioService);

  public portfolio = this.#portfolioService;
  public currentLanguage = this.#language.language;
  public getText = computed(() => this.#contentService.getContent());
  // GET TEXT IN SECTIONS
  public getTextInDock = computed(() => this.#contentService.getContent().navigation);
  public getTextInFooter = computed(() => this.#contentService.getContent().footer);
  // PAGES
  public getTextInHero = computed(() => this.#contentService.getContent().pages.hero);
  public getTextInAbout = computed(() => this.#contentService.getContent().pages.about);
  public getTextInProjects = computed(() => this.#contentService.getContent().pages.projects);
  public getTextInContact = computed(() => this.#contentService.getContent().pages.contact);

  public currentTheme = this.#themeService.theme;
  public isDarkTheme = computed(() => this.currentTheme() === 'dark');

  getContent(): any {
    return this.#contentService.getContent();
  }
}
