import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
    <section
      class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
    >
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="animate-float absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200 opacity-70 mix-blend-multiply blur-xl filter dark:bg-blue-900/30 dark:mix-blend-screen"
        ></div>
        <div
          class="animate-float absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-200 opacity-70 mix-blend-multiply blur-xl filter dark:bg-purple-900/30 dark:mix-blend-screen"
          style="animation-delay: 2s;"
        ></div>
        <div
          class="animate-float absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-emerald-200 opacity-50 mix-blend-multiply blur-xl filter dark:bg-emerald-900/20 dark:mix-blend-screen"
          style="animation-delay: 4s;"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-6 text-center">
        <div class="animate-slide-up">
          <!-- Avatar -->
          <div class="animate-slide-up mb-8">
            <div
              class="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl"
            ></div>
          </div>

          <h1 class="gradient-text animate-slide-up animate-delay-100 mb-4 text-5xl font-bold md:text-7xl">
            hero.greeting
          </h1>

          <h2
            class="animate-slide-up animate-delay-200 mb-6 text-2xl font-semibold text-neutral-600 md:text-3xl dark:text-neutral-300"
          >
            hero.title
          </h2>

          <p
            class="animate-slide-up animate-delay-300 mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl dark:text-neutral-400"
          >
            hero.description
          </p>

          <div class="animate-slide-up animate-delay-400 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              class="transform rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
            >
              hero?.viewWork
            </button>
            <button
              class="rounded-xl border-2 border-neutral-300 px-8 py-4 font-semibold text-neutral-700 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
            >
              hero?.contact
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export default class HeroComponent {}
