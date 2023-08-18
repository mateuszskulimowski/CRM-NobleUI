import { InjectionToken } from '@angular/core';

export const LOCALSTORAGE = new InjectionToken<LocalStorage>('LOCALSTORAGE');

export interface LocalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
