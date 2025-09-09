import { Book } from "./Book";

export class Member {
  private borrowedBooks: Book[] = [];

  constructor(public memberId: string, public name: string) {}

  borrowBook(book: Book): boolean {
    if (book.isAvailable) {
      book.isAvailable = false;
      book.borrowedBy = this.name;
      this.borrowedBooks.push(book);
      return true;
    }
    return false;
  }

  returnBook(book: Book): boolean {
    const index = this.borrowedBooks.findIndex(b => b.bookId === book.bookId);
    if (index !== -1) {
      book.isAvailable = true;
      book.borrowedBy = null;
      this.borrowedBooks.splice(index, 1);
      return true;
    }
    return false;
  }

  checkFines(): number {
    // Placeholder: ปรับตามกฎค่าปรับล่าช้า
    return 0;
  }

  getBorrowedBooks(): Book[] {
    return this.borrowedBooks;
  }
}
