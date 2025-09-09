import { Book } from "./Book";
import { Member } from "./Member";

export class Admin {
  constructor(public adminId: string, public name: string) {}

  addBook(books: Book[], book: Book) {
    books.push(book);
    console.log(`✅ Added book: ${book.title}`);
  }

  editBook(books: Book[], bookId: string, title: string, author: string) {
    const book = books.find(b => b.bookId === bookId);
    if (book) {
      book.title = title;
      book.author = author;
      console.log(`✅ Edited book: ${book.title}`);
    } else {
      console.log("❌ Book not found");
    }
  }

  removeBook(books: Book[], bookId: string) {
    const index = books.findIndex(b => b.bookId === bookId);
    if (index !== -1) {
      const removed = books.splice(index, 1)[0];
      console.log(`✅ Removed book: ${removed.title}`);
    } else {
      console.log("❌ Book not found");
    }
  }

  addMember(members: Member[], member: Member) {
    members.push(member);
    console.log(`✅ Added member: ${member.name}`);
  }

  removeMember(members: Member[], memberId: string) {
    const index = members.findIndex(m => m.memberId === memberId);
    if (index !== -1) {
      const removed = members.splice(index, 1)[0];
      console.log(`✅ Removed member: ${removed.name}`);
    } else {
      console.log("❌ Member not found");
    }
  }

  generateReport(books: Book[]) {
    console.log("\n📊 Books Report:");
    books.forEach(b => console.log(b.getInfo()));
  }
}

