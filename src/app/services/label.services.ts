import { Injectable } from '@angular/core';
import { Label } from '../models/label.model';

@Injectable({
  providedIn: 'root',
})
export class LabelsService {
  private readonly STORAGE_KEY = 'labels';

  getAll(): Label[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Label[];
    }
    const initial: Label[] = [];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  saveAll(labels: Label[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(labels));
  }
  getByName(name: string): Label | undefined {
    const labels = this.getAll();
    return labels.find((l) => l.name === name);
  }
  getById(id: number): Label | undefined {
    const labels = this.getAll();
    return labels.find((l) => l.id === id)
  }

  getOrCreateIdByName(name: string): number {
    const labels = this.getAll();
    const l = this.getByName(name)
    const maxId = labels.length ? Math.max( ...labels.map((l) => l.id)) : 0;

    if (l){
        return l.id 
    }
    else {
       const newLabel: Label = {
        id: maxId + 1,
        name: name!,
       }
       this.saveAll([...labels, newLabel])
       return newLabel.id
    }

  }

}
