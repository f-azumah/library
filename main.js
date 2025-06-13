const myLibrary = [];
const libDisplay = document.querySelector(".display");
let statsView = document.querySelector(".stats");

function Book(title, author, pages){
    if (!new.target) throw Error("You must use the 'new' operator to call this constructor");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    };
}

Book.prototype.markFinished = function() {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages){
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

// addBookToLibrary("Wahala", "Nikki May", 384);
// addBookToLibrary("The Three of Us", "Ore Agbaje-Williams", 150);
// addBookToLibrary("No Ordinary Love", "Myah Ariel" , 289);
// addBookToLibrary("Things Fall Apart", "Chinua Achebe", 300);
console.log(myLibrary)

function updateStats(){
    const readCount = myLibrary.filter(book => book.isRead).length;
    console.log(myLibrary.filter(book => book.isRead));
    statsView.textContent = `Total Books: ${myLibrary.length} | Finished: ${readCount} | Unread: ${myLibrary.length - readCount}`;
}

function displayBook(){
    libDisplay.textContent = "";
    if (myLibrary.length === 0){
        libDisplay.textContent = "No books 📚 in your library yet. Click New Book to add one!";
    }
    for (let i = 0; i < myLibrary.length; i++){
        let bookCard = document.createElement('div');
        bookCard.setAttribute(
            "style", "background-color: white; box-sizing: border-box; border-radius: 20px; width: 400px; height: 100px; box-shadow: 5px 5px 10px grey"
        );
        bookCard.classList.add("bookCard");
        bookCard.dataset.id = myLibrary[i].id;
        bookCard.textContent = myLibrary[i].info();
        if (myLibrary[i].isRead){
            bookCard.style.color = "white";
            bookCard.style.backgroundColor = "grey";
        }

        let Btns = document.createElement('div');
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Remove Book";
        Btns.appendChild(deleteBtn);
        Btns.classList.add("cardBtns");
        bookCard.appendChild(Btns);

        deleteBtn.addEventListener("click", () => {
            const bookId = bookCard.dataset.id;
            const index = myLibrary.findIndex(book => book.id === bookId);
            if (index != -1){
                myLibrary.splice(index, 1);
                bookCard.remove();
                updateStats();
            }
        })

        let toggleRead = document.createElement("button");
        toggleRead.textContent = "Mark as finished";
        if (myLibrary[i].isRead){
            toggleRead.textContent = "Mark as unread";
        }
        toggleRead.classList.add("toggle");
        Btns.appendChild(toggleRead);

        toggleRead.addEventListener("click", () => {
            myLibrary[i].markFinished();
            if (myLibrary[i].isRead){
                bookCard.style.color = "white";
                bookCard.style.backgroundColor = "grey";
                toggleRead.textContent = "Mark as unread";
            } else {
                bookCard.style.color = "black";
                bookCard.style.backgroundColor = "white";
                toggleRead.textContent = "Mark as finished";
            }
            updateStats();
        })
        
        libDisplay.appendChild(bookCard);
    }
    updateStats();
}

displayBook()


const addBtn = document.querySelector(".addBtn");
const newBookForm = document.querySelector(".addBook");
const submitBtn = document.querySelector(".submit")

addBtn.addEventListener("click", () => {
    newBookForm.showModal();
});

newBookForm.addEventListener("close", () => {
    title.value = "";
    author.value = "";
    pages.value = "";
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");

    if (title && author && pages){
        addBookToLibrary(title.value, author.value, pages.value);
        displayBook();
    }
    newBookForm.close();
});