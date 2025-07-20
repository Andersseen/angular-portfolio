import PROJECTS from '@/assets/data/projects.json';
import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export default class State {
  #slides = signal(SLIDES);
  #currentSlide = computed(() => {
    return this.#slides()[0];
  });

  #translationContent = signal(PROJECTS);

  public slides = this.#slides.asReadonly();
  public translationContent = this.#translationContent.asReadonly();
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

export interface Slide {
  id: number;
  code: string;
  img: string;
  title: string;
  link: string;
  description: string;
  features: string[];
}

export interface SlideTranslation {
  title: string;
  description: string;
  features: string[];
}

export const SLIDES: Slide[] = [
  {
    id: 1,
    code: 'falcoTech',
    img: '/falcotech.webp',
    title: 'FalcoTech',
    link: 'https://www.falcotech.es/',
    description:
      'Technical service and technology solutions company offering device repair, support, and IT management for businesses and individuals.',
    features: [
      'Responsive multi-page layout',
      'Service listing with contact form',
      'Simple color scheme focused on usability',
      'Angular frontend integration',
    ],
  },
  {
    id: 2,
    code: 'epm',
    img: '/epm.webp',
    title: 'Estética Paloma Molero',
    link: 'https://www.palomamolero.com/',
    description:
      'A modern beauty and aesthetics studio website showcasing treatments, pricing, and online booking options for clients.',
    features: [
      'Elegant and calming design',
      'Service and price listing',
      'Embedded Google Maps location',
      'Appointment contact integration',
    ],
  },
  {
    id: 3,
    code: 'soul',
    img: '/soul.webp',
    title: 'Soul Alegría',
    link: 'https://www.soulalegria.com/',
    description:
      'Dance and culture school website presenting courses, events, and information about Afro-Latin dance styles and philosophy.',
    features: [
      'Event calendar integration',
      'Video and gallery content',
      'Contact and registration forms',
      'Artistic, vibrant design language',
    ],
  },
  {
    id: 4,
    code: 'biker',
    img: '/biker.webp',
    title: 'Stylish Web',
    link: 'https://customadrid.pages.dev/',
    description:
      'Showcase for a motorcycle customization and repair garage with a bold aesthetic, featuring past projects and service information.',
    features: [
      'Gallery of custom motorcycles',
      'One-page layout with smooth scrolling',
      'Dark theme with contrasting accents',
      'Mobile-optimized experience',
    ],
  },
];
