import { Component } from '@angular/core';
import BaseComponent from '../../shared/base.component';

@Component({
  selector: 'app-projects',
  imports: [],
  template: `
    <section id="projects" class="section-padding">
      <div class="container-custom">
        <div class="mx-auto max-w-6xl">
          <div class="mb-16 text-center">
            <h2 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
              {{ getContent()?.projects?.title }}
            </h2>
            <div class="bg-primary-600 mx-auto mb-6 h-1 w-24 rounded-full"></div>
            <p class="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              {{ getContent()?.projects?.subtitle }}
            </p>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            @for (project of portfolioService.featuredProjects; track $index) {
              <div class="card group overflow-hidden transition-all duration-300 hover:scale-105">
                <!-- Project Image -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    [src]="project.image"
                    [alt]="project.title"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  ></div>
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <div class="flex space-x-4">
                      @if (project.demoUrl) {
                        <a
                          [href]="project.demoUrl"
                          target="_blank"
                          class="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
                        >
                          {{ getContent()?.projects?.demo }}
                        </a>
                      }
                      @if (project.githubUrl) {
                        <a
                          [href]="project.githubUrl"
                          target="_blank"
                          class="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
                        >
                          {{ getContent()?.projects?.code }}
                        </a>
                      }
                    </div>
                  </div>
                </div>

                <!-- Project Content -->
                <div class="p-6">
                  <h3
                    class="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-3 text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-white"
                  >
                    {{ project.title }}
                  </h3>
                  <p class="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {{ project.description }}
                  </p>

                  <div class="mb-4 flex flex-wrap gap-2">
                    @for (tech of project.technologies; track $index) {
                      <span
                        class="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {{ tech }}
                      </span>
                    }
                  </div>

                  <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
