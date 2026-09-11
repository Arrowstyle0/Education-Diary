import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiaryService, DiaryEntry } from './diary.service';
import { I18nService } from './i18n.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly diaryService = inject(DiaryService);
  protected readonly i18n = inject(I18nService);
  protected entries: DiaryEntry[] = [];
  protected isSaving = false;
  protected status = '';
  protected draftRestored = false;
  protected languages = this.i18n.languages;
  protected readonly entryForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    date: [this.today(), Validators.required]
  });

  ngOnInit(): void {
    this.restoreDraft();
    this.loadEntries();
    this.entryForm.valueChanges.subscribe((value) => localStorage.setItem('education-diary-draft', JSON.stringify(value)));
  }

  protected changeLanguage(language: string): void { this.i18n.changeLanguage(language); }

  protected saveEntry(): void {
    if (this.entryForm.invalid) { this.entryForm.markAllAsTouched(); return; }
    this.isSaving = true;
    this.diaryService.createEntry(this.entryForm.getRawValue()).subscribe({
      next: (entry) => {
        this.entries = [entry, ...this.entries];
        this.entryForm.reset({ title: '', description: '', date: this.today() });
        localStorage.removeItem('education-diary-draft');
        this.draftRestored = false;
        this.status = this.i18n.t('entrySaved');
        this.isSaving = false;
      },
      error: () => { this.status = this.i18n.t('offlineSaved'); this.isSaving = false; }
    });
  }

  protected deleteEntry(entry: DiaryEntry): void {
    this.diaryService.deleteEntry(entry._id).subscribe(() => this.entries = this.entries.filter((item) => item._id !== entry._id));
  }

  protected dismissEntry(entry: DiaryEntry): void {
    this.entries = this.entries.filter((item) => item._id !== entry._id);
  }

  protected clearHistory(): void {
    this.entries = [];
  }

  protected trackById(_: number, entry: DiaryEntry): string { return entry._id; }

  private loadEntries(): void { this.diaryService.getEntries().subscribe({ next: (entries) => this.entries = entries }); }

  private restoreDraft(): void {
    const draft = localStorage.getItem('education-diary-draft');
    if (!draft) return;
    try { this.entryForm.patchValue(JSON.parse(draft)); this.draftRestored = true; }
    catch { localStorage.removeItem('education-diary-draft'); }
  }

  private today(): string { return new Date().toISOString().slice(0, 10); }
}
