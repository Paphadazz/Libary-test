import { Book } from "./Book";

interface BorrowedBook {
  book: Book;
  borrowDate: Date;
  dueDate: Date;
}

export class Librarymember {
  private borrowedBooks: BorrowedBook[] = [];

  constructor(public memberId: string, public name: string) {}

  // ยืมหนังสือ
  borrowBook(book: Book, borrowDate: Date = new Date(), loanDays: number = 4): boolean {
    if (!book.isAvailable) {
      console.log(`❌ "${book.title}" is not available.`);
      return false;
    }

    book.isAvailable = false;
    book.borrowedBy = this.name;

    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + loanDays);

    this.borrowedBooks.push({ book, borrowDate, dueDate });
    console.log(`✅ ${this.name} borrowed "${book.title}" on ${borrowDate.toDateString()}. Must return by ${dueDate.toDateString()}.`);
    return true;
  }

  // คืนหนังสือ
  returnBook(book: Book, returnDate: Date = new Date()): boolean {
    const index = this.borrowedBooks.findIndex(b => b.book.bookId === book.bookId);
    if (index === -1) {
      console.log(`❌ ${this.name} did not borrow "${book.title}"`);
      return false;
    }

    const record = this.borrowedBooks[index];
    book.isAvailable = true;
    book.borrowedBy = null;
    this.borrowedBooks.splice(index, 1);

    let fine = 0;
    if (returnDate > record.dueDate) {
      const overdueDays = Math.ceil((returnDate.getTime() - record.dueDate.getTime()) / (1000 * 60 * 60 * 24));
      fine = overdueDays * 10; // 10 บาทต่อวัน
      console.log(`⚠ "${book.title}" returned late by ${overdueDays} days. Fine: ${fine} THB.`);
    } else {
      console.log(`✅ "${book.title}" returned on time. No fine.`);
    }
    return true;
  }

  // ตรวจสอบค่าปรับทั้งหมดสำหรับหนังสือที่ยังไม่คืน
  checkFines(currentDate: Date = new Date()): number {
    let totalFine = 0;
    this.borrowedBooks.forEach(record => {
      if (currentDate > record.dueDate) {
        const overdueDays = Math.ceil((currentDate.getTime() - record.dueDate.getTime()) / (1000 * 60 * 60 * 24));
        totalFine += overdueDays * 10;
      }
    });
    return totalFine;
  }

  // ดูรายการหนังสือที่ยืมอยู่ พร้อมวันครบกำหนดคืนและค่าปรับปัจจุบัน
  printBorrowedBooksStatus(currentDate: Date = new Date()): void {
    if (this.borrowedBooks.length === 0) {
      console.log(`${this.name} has no borrowed books.`);
      return;
    }

    this.borrowedBooks.forEach(record => {
      const fine = currentDate > record.dueDate
        ? Math.ceil((currentDate.getTime() - record.dueDate.getTime()) / (1000 * 60 * 60 * 24)) * 10
        : 0;
      console.log(`📖 "${record.book.title}" borrowed on ${record.borrowDate.toDateString()}, must return by ${record.dueDate.toDateString()}. Fine: ${fine} THB`);
    });
  }

  // ดูรายการหนังสือที่ยืมอยู่
  getBorrowedBooks(): BorrowedBook[] {
    return this.borrowedBooks;
  }
}
