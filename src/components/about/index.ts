import BaseComponent from '@/shared/base.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="py-20">
      <div class="container mx-auto px-6">
        <div class="mx-auto max-w-6xl">
          <div class="mb-16 text-center">
            <h2 class="gradient-text mb-4 text-4xl font-bold md:text-5xl">
              {{ getContent()?.about.title }}
            </h2>
            <p class="text-xl">
              {{ getContent()?.about.subtitle }}
            </p>
          </div>

          <div class="grid items-center gap-16 lg:grid-cols-2">
            <div class="space-y-6">
              @for (paragraph of getContent()?.about.paragraphs; track $index) {
                <p class="text-lg leading-relaxed">
                  {{ paragraph }}
                </p>
              }
              <!-- Stats -->
              <div class="mt-12 grid grid-cols-2 gap-6">
                @for (stat of getContent()?.about.stats; track $index) {
                  <div
                    class="rounded-xl bg-neutral-50 p-6 text-center transition-all duration-300 hover:shadow-lg dark:bg-neutral-800"
                  >
                    <div class="gradient-text mb-2 text-3xl font-bold">
                      {{ stat.number }}
                    </div>
                    <div class="text-sm font-medium">
                      {{ stat.label }}
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="relative">
              <div class="relative">
                <div
                  class="mx-auto aspect-square w-full max-w-md rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl"
                >
                  <div class="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl">
                    <img
                      src="linkedin_photo.jpg"
                      [alt]="portfolioService.personalInfo?.name"
                      class="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <!-- Floating elements -->
                <div
                  class="animate-float absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                >
                  <span class="text-2xl">🚀</span>
                </div>
                <div
                  class="animate-float absolute -bottom-4 -left-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg"
                  style="animation-delay: 1s;"
                >
                  <span class="text-2xl">💡</span>
                </div>
                <div
                  class="animate-float absolute top-1/2 -right-8 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg"
                  style="animation-delay: 2s;"
                >
                  <span class="text-xl">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export default class AboutComponent extends BaseComponent {}
