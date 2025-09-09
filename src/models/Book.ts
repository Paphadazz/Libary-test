export class Book {
  constructor(
    public bookId: string,
    public title: string,
    public author: string,
    public isAvailable: boolean = true,
    public borrowedBy: string | null = null
  ) {}

  getInfo(): string {
    return `${this.title} by ${this.author} (${this.isAvailable ? "Available" : `Borrowed by ${this.borrowedBy}`})`;
  }
}
