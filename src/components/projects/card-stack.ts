import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import ControlsComponent from './controls';
import State from './state';

@Component({
  selector: 'app-card-stack',
  imports: [NgStyle, ControlsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-full w-full perspective-[600px]">
      @for (card of cards(); track card.id) {
        <div
          class="border-foreground md:h- absolute h-full w-full cursor-grab touch-none overflow-hidden rounded-2xl border-4 bg-cover bg-center transition-transform duration-300 ease-out"
          [ngStyle]="{
            backgroundImage: 'url(' + card.img + ')',
            zIndex: getZIndex(card.id),
            transform: getCardTransform(card.id),
          }"
          (mousedown)="startDrag($event, card.id)"
          (mouseup)="endDrag()"
          (mouseleave)="endDrag()"
        ></div>
      }
    </div>
    <app-controls />
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        padding: 10rem 5rem;
      }

      @media (max-width: 768px) {
        :host {
          padding: 1rem 2rem 5rem 2rem;
          flex-direction: column-reverse;
        }
      }
    `,
  ],
})
export default class CardStack {
  #state = inject(State);

  public total = this.#state.totalItems;

  public cards = this.#state.slides;
  public draggingId = signal(0);
  public dragX = signal(0);
  public dragY = signal(0);

  startDrag(event: MouseEvent, id: number) {
    event.preventDefault();
    this.draggingId.set(id);
    const initialX = event.clientX;
    const initialY = event.clientY;
    const move = (e: MouseEvent) => {
      this.dragX.set(e.clientX - initialX);
      this.dragY.set(e.clientY - initialY);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', () => this.endDrag(move), { once: true });
  }

  endDrag(moveHandler?: (e: MouseEvent) => void) {
    if (moveHandler) window.removeEventListener('mousemove', moveHandler);

    if (Math.abs(this.dragX()) > 150 || Math.abs(this.dragY()) > 150) {
      this.sendToBack(this.dragX());
    }

    this.draggingId.set(0);
    this.dragX.set(0);
    this.dragY.set(0);
  }

  getCardTransform(id: number) {
    const index = this.cards().findIndex((c) => c.id === id);

    const baseRotate = (this.total() - index - 1) * 4;
    const scale = 1 + index * 0.06 - this.total() * 0.06;
    if (this.draggingId() === id) {
      return `translate(${this.dragX()}px, ${this.dragY()}px) rotateX(${this.dragY() / 4}deg) rotateY(${this.dragX() / 4}deg) scale(${scale})`;
    } else {
      return `rotateZ(${baseRotate}deg) scale(${scale})`;
    }
  }

  getZIndex(id: number) {
    return this.cards().findIndex((c) => c.id === id) + 1;
  }

  sendToBack(dragging: number) {
    if (dragging > 0) {
      this.#state.nextSlide();
      return;
    }
    this.#state.prevSlide();
  }
}
