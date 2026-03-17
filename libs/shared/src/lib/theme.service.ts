import { Injectable, inject, signal, computed, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeName = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);
  readonly theme = signal<ThemeName>(this._getSaved());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      if (!this._isBrowser) return;
      const t = this.theme();
      document.documentElement.classList.toggle('dark', t === 'dark');
      localStorage.setItem('portal_theme', t);
    });
  }

  toggle(): void { this.theme.update(t => t === 'light' ? 'dark' : 'light'); }

  private _getSaved(): ThemeName {
    if (!this._isBrowser) return 'light';
    const s = localStorage.getItem('portal_theme') as ThemeName | null;
    if (s === 'light' || s === 'dark') return s;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
