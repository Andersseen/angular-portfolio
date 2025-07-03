import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageService } from "../../services/language.service";
import { ContentService } from "../../services/content.service";
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white dark:bg-neutral-900">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {{ getContent()?.projects?.title }}
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-400">
              {{ getContent()?.projects?.subtitle }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let project of portfolioService.featuredProjects"
              class="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover-lift border border-neutral-100 dark:border-neutral-700"
            >
              <div class="relative overflow-hidden">
                <img
                  [src]="project.image"
                  [alt]="project.title"
                  class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
                <div
                  class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                >
                  <div class="flex gap-2">
                    <a
                      *ngIf="project.demoUrl"
                      [href]="project.demoUrl"
                      target="_blank"
                      class="px-4 py-2 bg-white/90 backdrop-blur-sm text-neutral-900 rounded-full text-sm font-medium hover:bg-white transition-colors"
                    >
                      {{ getContent()?.projects?.demo }}
                    </a>
                    <a
                      *ngIf="project.githubUrl"
                      [href]="project.githubUrl"
                      target="_blank"
                      class="px-4 py-2 bg-white/90 backdrop-blur-sm text-neutral-900 rounded-full text-sm font-medium hover:bg-white transition-colors"
                    >
                      {{ getContent()?.projects?.code }}
                    </a>
                  </div>
                </div>

                <!-- Status badge -->
                <div class="absolute top-4 right-4">
                  <span
                    class="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full"
                  >
                    {{ project.status }}
                  </span>
                </div>
              </div>

              <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h3
                    class="text-xl font-bold text-neutral-800 dark:text-neutral-200"
                  >
                    {{ project.title }}
                  </h3>
                  <span
                    class="text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-full"
                  >
                    {{ project.year }}
                  </span>
                </div>

                <p
                  class="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed"
                >
                  {{ project.description }}
                </p>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    *ngFor="let tech of project.technologies"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div
                  class="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400"
                >
                  <span>{{ project.client }}</span>
                  <span>{{ project.duration }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-12">
            <button
              class="px-8 py-4 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl font-semibold hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300"
            >
              {{ getContent()?.projects?.viewAll }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  languageService = inject(LanguageService);
  contentService = inject(ContentService);
  portfolioService = inject(PortfolioService);

  getContent() {
    return this.contentService.getContent(this.languageService.language());
  }
}
