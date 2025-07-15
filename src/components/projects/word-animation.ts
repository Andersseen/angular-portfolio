import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Input, WritableSignal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-word-animation',
  imports: [NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-flex text-[clamp(2rem,6vw,4rem)] leading-tight font-bold"
      [ngStyle]="{
        fontSize: 'clamp(2rem, 6vw, 3rem)',
        maxWidth: '18ch',
      }"
    >
      @for (char of animatedText(); track $index) {
        <span class="inline-block">{{ char }}</span>
      }
    </div>
  `,
})
export default class WordAnimation {
  private destroyRef = inject(DestroyRef);

  public alphabetEN: string[] = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
  public alphabetES: string[] = Array.from('AÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚVWXYZ' + 'aábcdeéfghiíjklmnñoópqrstuúvwxyz');

  public alphabetUA: string[] = Array.from('АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ' + 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя');

  private targetWord = signal<string>('');
  public animatedText: WritableSignal<string[]> = signal([]);

  @Input() set word(value: string) {
    if (value !== this.targetWord()) {
      this.targetWord.set(value);
      this.startAnimation(value);
    }
  }

  private frameId: number | null = null;

  private startAnimation(target: string) {
    const targetChars = Array.from(target);
    const currentChars: string[] = targetChars.map((char) => (char === ' ' ? ' ' : this.alphabetES[0]));
    this.animatedText.set([...currentChars]);

    if (this.frameId !== null) cancelAnimationFrame(this.frameId);

    const step = () => {
      let stillAnimating = false;

      for (let i = 0; i < targetChars.length; i++) {
        const targetChar = targetChars[i];
        if (targetChar === ' ') continue;

        const currentChar = currentChars[i];

        const targetIndex = this.alphabetES.indexOf(targetChar);
        const currentIndex = this.alphabetES.indexOf(currentChar);

        if (currentIndex < targetIndex) {
          currentChars[i] = this.alphabetES[currentIndex + 1] ?? targetChar;
          stillAnimating = true;
        }
      }

      this.animatedText.set([...currentChars]);

      if (stillAnimating) {
        this.frameId = requestAnimationFrame(step);
      }
    };

    this.frameId = requestAnimationFrame(step);

    this.destroyRef.onDestroy(() => {
      if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    });
  }
}
