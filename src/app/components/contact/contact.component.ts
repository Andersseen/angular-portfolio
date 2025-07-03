import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LanguageService } from "../../services/language.service";
import { ContentService } from "../../services/content.service";
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section
      class="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900"
    >
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {{ getContent()?.contact.title }}
            </h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
              {{ getContent()?.contact.subtitle }}
            </p>
            <p
              class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              {{ getContent()?.contact.description }}
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Contact Info -->
            <div class="space-y-8">
              <div
                class="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-100 dark:border-neutral-700"
              >
                <h3
                  class="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200"
                >
                  Get in Touch
                </h3>

                <div class="space-y-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 text-blue-600 dark:text-blue-400"
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
                    </div>
                    <div>
                      <div
                        class="font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        Email
                      </div>
                      <div class="text-neutral-600 dark:text-neutral-400">
                        {{ portfolioService.personalInfo?.email }}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div
                        class="font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        Phone
                      </div>
                      <div class="text-neutral-600 dark:text-neutral-400">
                        {{ portfolioService.personalInfo?.phone }}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div
                        class="font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        Location
                      </div>
                      <div class="text-neutral-600 dark:text-neutral-400">
                        {{ portfolioService.personalInfo?.location }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div
                class="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-100 dark:border-neutral-700"
              >
                <h3
                  class="text-xl font-bold mb-6 text-neutral-800 dark:text-neutral-200"
                >
                  Connect With Me
                </h3>
                <div class="flex flex-wrap gap-4">
                  <a
                    *ngFor="let social of portfolioService.socialLinks"
                    [href]="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-all duration-300 hover-lift"
                  >
                    <svg
                      class="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                    <span
                      class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >{{ social.name }}</span
                    >
                  </a>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-100 dark:border-neutral-700"
            >
              <h3
                class="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200"
              >
                {{ getContent()?.contact.form.send }}
              </h3>
              <form class="space-y-6" (ngSubmit)="onSubmit()">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      {{ getContent()?.contact.form.name }}
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="formData.name"
                      name="name"
                      required
                      class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      {{ getContent()?.contact.form.email }}
                    </label>
                    <input
                      type="email"
                      [(ngModel)]="formData.email"
                      name="email"
                      required
                      class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    {{ getContent()?.contact.form.subject }}
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="formData.subject"
                    name="subject"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    {{ getContent()?.contact.form.message }}
                  </label>
                  <textarea
                    [(ngModel)]="formData.message"
                    name="message"
                    required
                    rows="5"
                    class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  [disabled]="isSubmitting"
                  class="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span *ngIf="!isSubmitting">{{
                    getContent()?.contact.form.send
                  }}</span>
                  <span *ngIf="isSubmitting">{{
                    getContent()?.contact.form.sending
                  }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  languageService = inject(LanguageService);
  contentService = inject(ContentService);
  portfolioService = inject(PortfolioService);

  formData = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  isSubmitting = false;

  getContent(): any {
    return this.contentService.getContent(this.languageService.language());
  }

  onSubmit() {
    this.isSubmitting = true;

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;
      // Reset form
      this.formData = {
        name: "",
        email: "",
        subject: "",
        message: "",
      };
      alert(this.getContent()?.contact.form.success);
    }, 2000);
  }
}
