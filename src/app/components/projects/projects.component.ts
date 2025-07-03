import { Component } from '@angular/core';
import BaseComponent from '../../shared/base.component';

@Component({
  selector: 'app-projects',
  imports: [],
  template: `
    <section class="bg-white py-20 dark:bg-neutral-900">
      <div class="container mx-auto px-6">
        <div class="mx-auto max-w-6xl">
          <div class="mb-16 text-center">
            <h2 class="gradient-text mb-4 text-4xl font-bold md:text-5xl">
              {{ getContent()?.projects?.title }}
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-400">
              {{ getContent()?.projects?.subtitle }}
            </p>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            @for (project of portfolioService.featuredProjects; track $index) {
              <div
                class="group hover-lift overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div class="relative overflow-hidden">
                  <img
                    [src]="project.image"
                    [alt]="project.title"
                    class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  ></div>
                  <div
                    class="absolute right-4 bottom-4 left-4 translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <div class="flex gap-2">
                      @if (project.githubUrl) {
                        <a
                          [href]="project.demoUrl"
                          target="_blank"
                          class="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 backdrop-blur-sm transition-colors hover:bg-white"
                        >
                          {{ getContent()?.projects?.demo }}
                        </a>
                      }
                      @if (project.githubUrl) {
                        <a
                          [href]="project.githubUrl"
                          target="_blank"
                          class="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 backdrop-blur-sm transition-colors hover:bg-white"
                        >
                          {{ getContent()?.projects?.code }}
                        </a>
                      }
                    </div>
                  </div>

                  <!-- Status badge -->
                  <div class="absolute top-4 right-4">
                    <span class="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                      {{ project.status }}
                    </span>
                  </div>
                </div>

                <div class="p-6">
                  <div class="mb-3 flex items-start justify-between">
                    <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                      {{ project.title }}
                    </h3>
                    <span
                      class="rounded-full bg-neutral-100 px-2 py-1 text-sm text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
                    >
                      {{ project.year }}
                    </span>
                  </div>

                  <p class="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {{ project.description }}
                  </p>

                  <div class="mb-4 flex flex-wrap gap-2">
                    @for (tech of project.technologies; track $index) {
                      <span
                        class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {{ tech }}
                      </span>
                    }
                  </div>

                  <div class="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <span>{{ project.client }}</span>
                    <span>{{ project.duration }}</span>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="mt-12 text-center">
            <button
              class="rounded-xl border-2 border-neutral-300 px-8 py-4 font-semibold text-neutral-700 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
            >
              {{ getContent()?.projects?.viewAll }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent extends BaseComponent {}
