import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageService } from "../../services/language.service";
import { ContentService } from "../../services/content.service";
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: "app-skills",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-neutral-50 dark:bg-neutral-800">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {{ getContent()?.skills?.title }}
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-400">
              {{ getContent()?.skills?.subtitle }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              *ngFor="let category of getSkillCategories()"
              class="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift border border-neutral-100 dark:border-neutral-700"
            >
              <h3
                class="text-xl font-bold mb-8 text-neutral-800 dark:text-neutral-200 text-center"
              >
                {{ category.name }}
              </h3>
              <div class="space-y-6">
                <div *ngFor="let skill of category.skills" class="skill-item">
                  <div class="flex justify-between items-center mb-3">
                    <span
                      class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >{{ skill.name }}</span
                    >
                    <span
                      class="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full"
                    >
                      {{ skill.level }}%
                    </span>
                  </div>
                  <div
                    class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2"
                  >
                    <div
                      class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      [style.width.%]="skill.level"
                    ></div>
                  </div>
                  <div
                    class="text-xs text-neutral-500 dark:text-neutral-400 mt-1"
                  >
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
        skills: skills.filter((skill) => skill.category === "frontend"),
      },
      {
        name: content.skills.categories.backend,
        skills: skills.filter((skill) => skill.category === "backend"),
      },
      {
        name: content.skills.categories.tools,
        skills: skills.filter((skill) => skill.category === "tools"),
      },
      {
        name: content.skills.categories.other,
        skills: skills.filter((skill) => skill.category === "other"),
      },
    ].filter((category) => category.skills.length > 0);
  }
}
