import { STORAGE_KEY } from "@/shared/config";
import type { IBlock, IItem, ISubject } from "@/entities/subject/interfaces/subject.interface";
import { parseSubjects } from "@/entities/subject/utils/parse-subjects.util";
import { createBlock, createItem, createSubject } from "@/entities/subject/utils/subject-factory.util";

type Listener = () => void;

class SubjectStore {
  private subjects: ISubject[] | null = null;
  private readonly listeners = new Set<Listener>();

  subscribe = (listener: Listener): (() => void) => {
    if (!this.listeners.size) window.addEventListener("storage", this.handleStorage);
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
      if (!this.listeners.size) window.removeEventListener("storage", this.handleStorage);
    };
  };

  getSnapshot = (): ISubject[] => (this.subjects ??= this.read());

  getServerSnapshot = (): null => null;

  replaceAll(subjects: ISubject[]): void {
    this.write(subjects);
  }

  addSubject(fields: Pick<ISubject, "title" | "kind">): string {
    const subject = createSubject(fields);
    this.change((subjects) => subjects.push(subject));
    return subject.id;
  }

  updateSubject(subjectId: string, patch: Partial<Omit<ISubject, "id">>): void {
    this.changeSubject(subjectId, (subject) => Object.assign(subject, patch));
  }

  addSubjects(templates: ISubject[]): void {
    this.change((subjects) => {
      const existingIds = new Set(subjects.map(({ id }) => id));
      subjects.push(...structuredClone(templates.filter(({ id }) => !existingIds.has(id))));
    });
  }

  removeSubject(subjectId: string): void {
    this.write(this.getSnapshot().filter(({ id }) => id !== subjectId));
  }

  addBlock(subjectId: string, title: string): string {
    const block = createBlock({ title });
    this.changeSubject(subjectId, (subject) => subject.blocks.push(block));
    return block.id;
  }

  updateBlock(subjectId: string, blockId: string, patch: Partial<Omit<IBlock, "id">>): void {
    this.changeBlock(subjectId, blockId, (block) => Object.assign(block, patch));
  }

  removeBlock(subjectId: string, blockId: string): void {
    this.changeSubject(subjectId, (subject) => {
      subject.blocks = subject.blocks.filter(({ id }) => id !== blockId);
    });
  }

  addItem(subjectId: string, blockId: string, title: string): string {
    const item = createItem({ title });
    this.changeBlock(subjectId, blockId, (block) => block.items.push(item));
    return item.id;
  }

  updateItem(subjectId: string, blockId: string, itemId: string, patch: Partial<Omit<IItem, "id">>): void {
    this.changeBlock(subjectId, blockId, (block) => {
      const item = block.items.find(({ id }) => id === itemId);
      if (item) Object.assign(item, patch);
    });
  }

  removeItem(subjectId: string, blockId: string, itemId: string): void {
    this.changeBlock(subjectId, blockId, (block) => {
      block.items = block.items.filter(({ id }) => id !== itemId);
    });
  }

  resetMarks(subjectId: string): void {
    this.changeSubject(subjectId, (subject) => {
      if (subject.attendance) subject.attendance.marks = subject.attendance.marks.map(() => null);
      subject.blocks.forEach((block) => {
        block.status = "todo";
        block.points = 0;
        block.items.forEach((item) => {
          item.status = "todo";
        });
      });
    });
  }

  private handleStorage = (event: StorageEvent): void => {
    if (event.key !== STORAGE_KEY) return;
    this.subjects = this.read();
    this.emit();
  };

  private read(): ISubject[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return (saved && parseSubjects(JSON.parse(saved))) || [];
    } catch {
      return [];
    }
  }

  private write(subjects: ISubject[]): void {
    this.subjects = subjects;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    } catch {}
    this.emit();
  }

  private change(mutate: (subjects: ISubject[]) => void): void {
    const subjects = structuredClone(this.getSnapshot());
    mutate(subjects);
    this.write(subjects);
  }

  private changeSubject(subjectId: string, mutate: (subject: ISubject) => void): void {
    this.change((subjects) => {
      const subject = subjects.find(({ id }) => id === subjectId);
      if (subject) mutate(subject);
    });
  }

  private changeBlock(subjectId: string, blockId: string, mutate: (block: IBlock) => void): void {
    this.changeSubject(subjectId, (subject) => {
      const block = subject.blocks.find(({ id }) => id === blockId);
      if (block) mutate(block);
    });
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const subjectStore = new SubjectStore();
