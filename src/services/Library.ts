import { Book } from "../models/Book";
import { Member } from "../models/Member";

export class Library {
  public books: Book[] = [];
  public members: Member[] = [];

  borrowBook(memberId: string, bookId: string): void {
    const member = this.members.find(m => m.memberId === memberId);
    const book = this.books.find(b => b.bookId === bookId);
    if (!member) return console.log("❌ Member not found");
    if (!book) return console.log("❌ Book not found");

    if (member.borrowBook(book)) console.log(`✅ ${member.name} borrowed the book: ${book.title}`);
    else console.log(`❌ ${book.title} is not available`);
  }

  returnBook(memberId: string, bookId: string): void {
    const member = this.members.find(m => m.memberId === memberId);
    const book = this.books.find(b => b.bookId === bookId);
    if (!member) return console.log("❌ Member not found");
    if (!book) return console.log("❌ Book not found");

    if (member.returnBook(book)) console.log(`✅ ${member.name} returned the book: ${book.title}`);
    else console.log(`❌ ${member.name} did not borrow the book: ${book.title}`);
  }
}
