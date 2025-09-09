import readlineSync from "readline-sync";
import { Library } from "./services/Library";
import { Book } from "./models/Book";
import { Member } from "./models/Member";
import { Admin } from "./models/Admin";

const prompt = (question: string) => readlineSync.question(question);

const library = new Library();
const admin = new Admin("A001", "Bob");

// Sample Data
library.books.push(new Book("B001", "Clean Code", "Robert C. Martin"));
library.books.push(new Book("B002", "The Pragmatic Programmer", "Andrew Hunt"));
library.members.push(new Member("M001", "Alice"));
library.members.push(new Member("M002", "John"));

// --- Submenus ---
function manageBooks() {
  while (true) {
    console.log("\n📖 Manage Books:");
    console.log("a. Add Book");
    console.log("b. Edit Book");
    console.log("c. Remove Book");
    console.log("d. Exit");

    const choice = prompt("you choose: ").toLowerCase();
    if (choice === "a") {
      const id = prompt("Book ID: ");
      const title = prompt("Book Title: ");
      const author = prompt("Author: ");
      admin.addBook(library.books, new Book(id, title, author));
    } else if (choice === "b") {
      const id = prompt("Book ID to edit: ");
      const title = prompt("New Title: ");
      const author = prompt("New Author: ");
      admin.editBook(library.books, id, title, author);
    } else if (choice === "c") {
      const id = prompt("Book ID to remove: ");
      admin.removeBook(library.books, id);
    } else if (choice === "d") break;
    else console.log("❌ Invalid choice");
  }
}

function manageMembers() {
  while (true) {
    console.log("\n👤 Manage Members:");
    console.log("a. Add Member");
    console.log("b. Remove Member");
    console.log("c. Exit");

    const choice = prompt("you choose: ").toLowerCase();
    if (choice === "a") {
      const name = prompt("Member Name: ");
      const id = prompt("Member ID: ");
      admin.addMember(library.members, new Member(id, name));
    } else if (choice === "b") {
      const id = prompt("Member ID to remove: ");
      admin.removeMember(library.members, id);
    } else if (choice === "c") break;
    else console.log("❌ Invalid choice");
  }
}

// --- Menus ---
function adminMenu() {
  while (true) {
    console.log("\n=== Admin Menu ===");
    console.log("1. Manage Books");
    console.log("2. Manage Members");
    console.log("3. Borrowing and Returning");
    console.log("4. Reports");
    console.log("5. Exit");

    const choice = prompt("you choose: ");
    switch (choice) {
      case "1": manageBooks(); break;
      case "2": manageMembers(); break;
      case "3": {
        const name = prompt("Member Name: ");
        const id = prompt("Member ID: ");
        const member = library.members.find(m => m.memberId === id && m.name.toLowerCase() === name.toLowerCase());
        if (!member) return console.log("❌ Member not found");

        const bookId = prompt("Book ID: ");
        const action = prompt("borrow/return? ").toLowerCase();
        if (action === "borrow") library.borrowBook(member.memberId, bookId);
        else if (action === "return") library.returnBook(member.memberId, bookId);
        else console.log("❌ Invalid action");
        break;
      }
      case "4": admin.generateReport(library.books); break;
      case "5": return;
      default: console.log("❌ Invalid choice"); break;
    }
  }
}

function memberMenu(member: Member) {
  while (true) {
    console.log("\n=== Member Menu ===");
    console.log("1. Search Books");
    console.log("2. Borrow & Return");
    console.log("3. Check Fines");
    console.log("4. Exit");

    const choice = prompt("you choose: ");
    switch (choice) {
      case "1": {
        const title = prompt("Book Title: ");
        const found = library.books.find(b => b.title.toLowerCase() === title.toLowerCase());
        console.log(found ? found.getInfo() : "❌ Book not found");
        break;
      }
      case "2": {
        const bookId = prompt("Book ID: ");
        const action = prompt("borrow/return? ").toLowerCase();
        if (action === "borrow") library.borrowBook(member.memberId, bookId);
        else if (action === "return") library.returnBook(member.memberId, bookId);
        else console.log("❌ Invalid action");
        break;
      }
      case "3": console.log(`💰 Fines: ${member.checkFines()} currency`); break;
      case "4": return;
      default: console.log("❌ Invalid choice"); break;
    }
  }
}

// --- Main Loop ---
while (true) {
  const role = prompt("You are (admin/member) or type 'exit' to quit: ").toLowerCase();
  if (role === "admin") adminMenu();
  else if (role === "member") {
    const name = prompt("Member Name: ");
    const id = prompt("Member ID: ");
    const member = library.members.find(m => m.memberId === id && m.name.toLowerCase() === name.toLowerCase());
    if (member) memberMenu(member);
    else console.log("❌ Member not found");
  } else if (role === "exit") {
    console.log("👋 Exiting program");
    break;
  } else console.log("❌ Invalid role");
}
