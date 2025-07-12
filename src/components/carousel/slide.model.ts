export interface SlideItem {
  id: string | number;
  img: string;
  title: string;
  subtitle: string;

  route: string;
}

export interface CurrentSlideData {
  data: SlideItem;
  index: number;
}
