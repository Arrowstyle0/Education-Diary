import { Injectable, signal } from '@angular/core';

export interface Language {
  code: string;
  label: string;
}
type Dictionary = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly fallback: Dictionary = {
    deleteEntry: 'Delete',
    removeFromHistory: 'Remove from history',
    clearHistory: 'Clear history',
  };
  readonly languages: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ja', label: '日本語' },
    { code: 'ar', label: 'العربية' },
    { code: 'pt', label: 'Português' },
    { code: 'bn', label: 'বাংলা' },
  ];
  readonly language = signal(localStorage.getItem('education-diary-language') || 'en');
  private readonly dictionary = signal<Dictionary>({});
  constructor() {
    void this.load(this.language());
  }
  t(key: string): string {
    return this.dictionary()[key] || this.fallback[key] || key;
  }
  async changeLanguage(language: string): Promise<void> {
    this.language.set(language);
    localStorage.setItem('education-diary-language', language);
    await this.load(language);
  }
  private async load(language: string): Promise<void> {
    try {
      this.dictionary.set(
        await fetch(`/locales/${language}.json`).then((response) => response.json()),
      );
    } catch {
      this.dictionary.set(await fetch('/locales/en.json').then((response) => response.json()));
    }
  }
}
