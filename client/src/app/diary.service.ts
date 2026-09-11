import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DiaryEntry { _id: string; title: string; description: string; date: string; }
export type NewDiaryEntry = Omit<DiaryEntry, '_id'>;

@Injectable({ providedIn: 'root' })
export class DiaryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/entries';
  getEntries(): Observable<DiaryEntry[]> { return this.http.get<DiaryEntry[]>(this.apiUrl); }
  createEntry(entry: NewDiaryEntry): Observable<DiaryEntry> { return this.http.post<DiaryEntry>(this.apiUrl, entry); }
  deleteEntry(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
