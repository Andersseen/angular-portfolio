import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageService } from "../../services/language.service";
import { ContentService } from "../../services/content.service";
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white dark:bg-neutral-900">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {{ getContent()?.about.title }}
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-400">
              {{ getContent()?.about.subtitle }}
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-6">
              <p
                *ngFor="let paragraph of getContent()?.about.paragraphs"
                class="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
              >
                {{ paragraph }}
              </p>

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-6 mt-12">
                <div
                  *ngFor="let stat of getContent()?.about.stats"
                  class="text-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div class="text-3xl font-bold gradient-text mb-2">
                    {{ stat.number }}
                  </div>
                  <div
                    class="text-sm text-neutral-600 dark:text-neutral-400 font-medium"
                  >
                    {{ stat.label }}
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <div class="relative">
                <div
                  class="w-full max-w-md mx-auto aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl"
                >
                  <div
                    class="w-full h-full rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      [src]="portfolioService.personalInfo?.avatar"
                      [alt]="portfolioService.personalInfo?.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <!-- Floating elements -->
                <div
                  class="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center animate-float shadow-lg"
                >
                  <span class="text-2xl">🚀</span>
                </div>
                <div
                  class="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center animate-float shadow-lg"
                  style="animation-delay: 1s;"
                >
                  <span class="text-2xl">💡</span>
                </div>
                <div
                  class="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center animate-float shadow-lg"
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
export class AboutComponent {
  languageService = inject(LanguageService);
  contentService = inject(ContentService);
  portfolioService = inject(PortfolioService);

  getContent(): any {
    return this.contentService.getContent(this.languageService.language());
  }
}
