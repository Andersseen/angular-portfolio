import { ContentService } from '@/services/dictionaries';
import { LanguageService } from '@/services/language.service';
import { PortfolioService } from '@/services/portfolio.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-20">
      <div class="container mx-auto px-6">
        <div class="mx-auto max-w-6xl">
          <div class="mb-16 text-center">
            <h2 class="gradient-text mb-4 text-4xl font-bold md:text-5xl">
              {{ getContent()?.skills?.title }}
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-400">
              {{ getContent()?.skills?.subtitle }}
            </p>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div
              *ngFor="let category of getSkillCategories()"
              class="hover-lift rounded-2xl border border-neutral-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
            >
              <h3 class="mb-8 text-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
                {{ category.name }}
              </h3>
              <div class="space-y-6">
                <div *ngFor="let skill of category.skills" class="skill-item">
                  <div class="mb-3 flex items-center justify-between">
                    <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ skill.name }}</span>
                    <span
                      class="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {{ skill.level }}%
                    </span>
                  </div>
                  <div class="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                    <div
                      class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                      [style.width.%]="skill.level"
                    ></div>
                  </div>
                  <div class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {{ skill.experience }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  languageService = inject(LanguageService);
  contentService = inject(ContentService);
  portfolioService = inject(PortfolioService);

  getContent() {
    return this.contentService.getContent(this.languageService.language());
  }

  getSkillCategories() {
    const content = this.getContent();
    if (!content) return [];

    const skills = this.portfolioService.skills;

    return [
      {
        name: content.skills.categories.frontend,
        skills: skills.filter((skill) => skill.category === 'frontend'),
      },
      {
        name: content.skills.categories.backend,
        skills: skills.filter((skill) => skill.category === 'backend'),
      },
      {
        name: content.skills.categories.tools,
        skills: skills.filter((skill) => skill.category === 'tools'),
      },
      {
        name: content.skills.categories.other,
        skills: skills.filter((skill) => skill.category === 'other'),
      },
    ].filter((category) => category.skills.length > 0);
  }
}
