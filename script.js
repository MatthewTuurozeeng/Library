
const my_library = [];
function Book(title, author, pages, read) {
    if(!this instanceof Book) 
        throw new Error("Constructor must be called with 'new'"
    );
    this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
// Method to toggle the read status of a book
// It flips the boolean value of the read property
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};
// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  my_library.push(book);
}

// function to remove a book from the library by its id
// it finds the book in the my_library array and removes it if found
function removeBookFromLibrary(id) {
  const index = my_library.findIndex(book => book.id === id);
  if (index !== -1) {
    my_library.splice(index, 1);
  }
}
function displayBooks() {
  const book_list = document.getElementById('book-list');
  book_list.innerHTML = '';
  // create a table and its header
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const header_row = document.createElement('tr');
  ['Title', 'Author', 'Pages', 'Read'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    header_row.appendChild(th);
  });
  thead.appendChild(header_row);
  table.appendChild(thead);
  // create a body for the table
  // loops through the books in my_library and creates a row for each book

  const t_body = document.createElement('tbody');
  my_library.forEach(book => {
    const row = document.createElement('tr');
    [book.title, book.author, book.pages, book.read ? 'Yes' : 'No'].forEach(val => {
    const td = document.createElement('td');
      td.textContent = val;
      row.appendChild(td);
    });

    // create a toggle button for each book
    // It toggles the read status of the book when clicked
    const toggle_td = document.createElement('td');
    const toggle_btn = document.createElement('button');
    toggle_btn.textContent = 'Toggle Read';
    toggle_btn.setAttribute('data-id', book.id);
    toggle_btn.addEventListener('click', function() {
      book.toggleRead();
      displayBooks();
    });
    toggle_td.appendChild(toggle_btn);


    
    // create a delete button for each book 
    const remove_btn = document.createElement('button');
    remove_btn.textContent = 'Remove';
    remove_btn.setAttribute('data-id', book.id); // associate button with book id
    remove_btn.addEventListener('click', function() {
      removeBookFromLibrary(book.id);
      displayBooks();
    });
    toggle_btn.appendChild(remove_btn);
    row.appendChild(toggle_td);

    t_body.appendChild(row);
  });
  table.appendChild(t_body);

  book_list.appendChild(table);
}

// Event listeners for the dialog and form submission

document.getElementById('new-book-btn').addEventListener('click', () => {
document.getElementById('new-book-dialog').showModal();
});

document.getElementById('close-dialog-btn').addEventListener('click', () => {
  document.getElementById('new-book-dialog').close();
});

document.getElementById('new-book-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents default form submission

  const form = event.target;
  const title = form.title.value;
  const author = form.author.value;
  const pages = parseInt(form.pages.value, 10);
  const read = form.read.checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  form.reset();
  document.getElementById('new-book-dialog').close();
});



