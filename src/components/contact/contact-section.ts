import Base from '@/shared/base';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
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
          <h2 class="text-3xl font-bold">{{ data().title }}</h2>

          <div>
            <label class="block text-sm font-medium">{{ data().nameInput }}</label>
            <input
              type="text"
              class="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium">{{ data().emailInput }}</label>
            <input
              type="email"
              class="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium">{{ data().messageInput }}</label>
            <textarea
              rows="4"
              class="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            class="bg-foreground hover:bg-primary hover:text-foreground text-background inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold shadow transition duration-300 ease-in-out hover:scale-105"
          >
            {{ data().button }}
          </button>
        </form>
      </div>
    </section>
  `,
})
export default class ContactSection extends Base {
  public data = computed(() => ({
    title: this.getTextInContact().title,
    nameInput: this.getTextInContact().nameInput,
    lastNameInput: this.getTextInContact().lastNameInput,
    emailInput: this.getTextInContact().emailInput,
    messageInput: this.getTextInContact().messageInput,
    button: this.getTextInContact().button,
  }));
}
