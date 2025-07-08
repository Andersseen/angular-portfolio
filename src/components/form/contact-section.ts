import { ChangeDetectionStrategy, Component } from '@angular/core';
import Globe from './globe';

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Globe],
  template: `
    <section class="flex h-screen w-full justify-center">
      <!-- 🌍 Globe visible solo en escritorio -->

      <div class="hidden h-full w-full md:block md:w-1/2">
        <app-globe />
      </div>

      <!-- 📬 Formulario -->
      <div class="flex w-full items-center justify-center p-8 md:w-1/2">
        <form class="w-full max-w-md space-y-6">
          <h2 class="text-3xl font-bold">Let's talk!</h2>

          <div>
            <label class="block text-sm font-medium">Name</label>
            <input
              type="text"
              class="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium">Email</label>
            <input
              type="email"
              class="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium">Message</label>
            <textarea
              rows="4"
              class="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full rounded-md bg-neutral-200 px-4 py-2 transition hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  `,
})
export default class ContactSection {}
