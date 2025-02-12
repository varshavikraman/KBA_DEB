const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const books = new Map();
let nextId = 1;

function addBook(title, author) {
  const id = nextId++;
  books.set(id, { id, title, author, status: "Available" });
  console.log("Book added to library");
}

function displayBooks() {
  if (books.size === 0) {
    console.log('No books in the library.');
    return;
  }
  console.log('Library Books:');
  books.forEach(book => {
    console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Status: ${book.status}`);
  });
}

function borrowBook(id) {
  const book = books.get(id);
  if (book) {
    if (book.status === 'Available') {
      book.status = 'Borrowed';
      console.log(`You have borrowed "${book.title}".`);
    } else {
      console.log(`The book "${book.title}" is already borrowed.`);
    }
  } else {
    console.log('Invalid book ID.');
  }
}

function returnBook(id) {
  const book = books.get(id);
  if (book) {
    if (book.status === 'Borrowed') {
      book.status = 'Available';
      console.log(`You have returned "${book.title}".`);
    } else {
      console.log(`The book "${book.title}" was not borrowed.`);
    }
  } else {
    console.log('Invalid book ID.');
  }
}

function deleteBook(id) {
  if (books.delete(id)) {
    console.log('Book deleted successfully.');
  } else {
    console.log('Invalid book ID.');
  }
}

function showMenu() {
  console.log('\nLibrary Management System');
  console.log('1. Add Book');
  console.log('2. Display Books');
  console.log('3. Borrow Book');
  console.log('4. Return Book');
  console.log('5. Delete Book');
  console.log('6. Exit');
  rl.question('Select an option: ', handleUserInput);
}

function handleUserInput(option) {
  switch (option) {
    case '1':
      rl.question('Enter book title: ', title => {
        rl.question('Enter book author: ', author => {
          addBook(title, author);
          showMenu();
        });
      });
      break;
    case '2':
      displayBooks();
      showMenu();
      break;
    case '3':
      rl.question('Enter book ID to borrow: ', id => {
        borrowBook(Number(id));
        showMenu();
      });
      break;
    case '4':
      rl.question('Enter book ID to return: ', id => {
        returnBook(Number(id));
        showMenu();
      });
      break;
    case '5':
      rl.question('Enter book ID to delete: ', id => {
        deleteBook(Number(id));
        showMenu();
      });
      break;
    case '6':
      console.log('Exiting the program. Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid option. Please try again.');
      showMenu();
  }
}

showMenu();
