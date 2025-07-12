import { SlideItem } from './slide.model';

export type CurrentSlideData = {
  data: SlideItem;
  index: number;
};

export const SLIDES: SlideItem[] = [
  {
    img: '/falcotech.webp',

    subtitle: '',
    title: 'FalcoTech',
    id: '44444q4',
    route: 'https://www.falcotech.es',
  },
  {
    img: '/epm.webp',
    title: 'Estética Paloma Molero',

    subtitle: '',
    id: '2222222w2',
    route: 'https://www.palomamolero.com',
  },
  {
    img: '/soul.webp',

    subtitle: '',
    title: 'Soul Alegría',
    id: '111111q1',
    route: 'https://soulalegria.com',
  },

  {
    img: '/biker.webp',
    title: 'Stylish web',

    subtitle: '',
    id: '333333e3',
    route: 'https://customadrid.pages.dev',
  },
  {
    img: '/bunker-seguridad.webp',
    title: 'Bunker Seguridad',

    subtitle: '',
    id: '5555555t5',
    route: 'https://www.bunkerseguridad.es',
  },
  {
    img: '/yevhen-portafolio.webp',
    title: 'Portfolio to developer',

    subtitle: '',
    id: '6666666y6',
    route: 'https://yevhen-letin.pages.dev',
  },
  {
    img: '/beauty-line.webp',
    title: 'Esthetic center',

    subtitle: '',
    id: '777777u7',
    route: 'https://www.beauty-line-esthetic.es',
  },
];
