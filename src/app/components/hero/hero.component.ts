import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageService } from "../../services/language.service";
import { ContentService } from "../../services/content.service";
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 relative overflow-hidden"
    >
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"
          style="animation-delay: 2s;"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-50 animate-float"
          style="animation-delay: 4s;"
        ></div>
      </div>

      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="animate-slide-up">
          <!-- Avatar -->
          <div class="mb-8 animate-slide-up">
            <div
              class="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl"
            >
              <img
                [src]="portfolioService.personalInfo?.avatar"
                [alt]="portfolioService.personalInfo?.name"
                class="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <h1
            class="text-5xl md:text-7xl font-bold mb-4 gradient-text animate-slide-up animate-delay-100"
          >
            {{ getContent()?.hero.greeting }}
          </h1>

          <h2
            class="text-2xl md:text-3xl font-semibold mb-6 text-neutral-600 dark:text-neutral-300 animate-slide-up animate-delay-200"
          >
            {{ getContent()?.hero.title }}
          </h2>

          <p
            class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-300"
          >
            {{ getContent()?.hero.description }}
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-400"
          >
            <button
              class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {{ getContent()?.hero?.viewWork }}
            </button>
            <button
              class="px-8 py-4 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl font-semibold hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300"
            >
              {{ getContent()?.hero?.contact }}
            </button>
          </div>

          <!-- Social Links -->
          <div
            class="flex justify-center gap-4 mt-12 animate-slide-up animate-delay-500"
          >
            <a
              *ngFor="let social of portfolioService.socialLinks"
              [href]="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-110"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  *ngIf="social.icon === 'github'"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
                <path
                  *ngIf="social.icon === 'linkedin'"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
                <path
                  *ngIf="social.icon === 'twitter'"
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
              <svg
                *ngIf="social.icon === 'mail'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="mt-16 animate-bounce-gentle">
          <svg
            class="w-8 h-8 mx-auto text-neutral-400 dark:text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  languageService = inject(LanguageService);
  contentService = inject(ContentService);
  portfolioService = inject(PortfolioService);

  getContent(): any {
    return this.contentService.getContent(this.languageService.language());
  }
}
