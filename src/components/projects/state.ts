import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export default class State {
  #slides = signal(SLIDES);
  #currentSlide = computed(() => {
    return this.#slides()[0];
  });

  public slides = this.#slides.asReadonly();
  public currentSlide = this.#currentSlide;
  public totalItems = computed(() => this.#slides().length);
  public currentIndex = signal(1);

  nextSlide() {
    this.currentIndex.update((state) => {
      if (state === this.totalItems()) return (state = 1);
      return state + 1;
    });

    const arr = [...this.#slides()];
    const card = arr.pop();
    if (card) arr.unshift(card);
    this.#slides.set(arr);
  }

  prevSlide() {
    this.currentIndex.update((state) => {
      if (state === 1) return (state = this.totalItems());
      return state - 1;
    });

    const arr = [...this.#slides()];
    const slide = arr.shift();
    if (slide) arr.push(slide);
    this.#slides.set(arr);
  }
}

export const SLIDES: Slide[] = [
  { id: 1, img: '/falcotech.webp', title: 'FalcoTech' },
  { id: 2, img: '/epm.webp', title: 'Estética Paloma Molero' },
  { id: 3, img: '/soul.webp', title: 'Soul Alegría' },
  { id: 4, img: '/biker.webp', title: 'Stylish web' },
];

export interface Slide {
  id: number;
  img: string;
  title: string;
}
