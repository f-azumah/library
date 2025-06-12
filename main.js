const myLibrary = [];
const libDisplay = document.querySelector(".display");
let finished = false;

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

function addBookToLibrary(title, author, pages){
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

addBookToLibrary("Wahala", "Nikki May", 384);
addBookToLibrary("The Three of Us", "Ore Agbaje-Williams", 150);
addBookToLibrary("No Ordinary Love", "Myah Ariel" , 289);
addBookToLibrary("Things Fall Apart", "Chinua Achebe", 300);
console.log(myLibrary)

Book.prototype.markFinished = function() {
    this.isRead = !this.isRead;
    finished = !finished
}

function displayBook(){
    libDisplay.textContent = "";
    for (let i = 0; i < myLibrary.length; i++){
        let bookCard = document.createElement('div');
        bookCard.setAttribute(
            "style", "background-color: LightBlue; box-sizing: border-box; border-radius: 20px; width: 400px; height: 100px; box-shadow: 5px 5px 10px grey"
        );
        bookCard.classList.add("bookCard");
        bookCard.dataset.id = myLibrary[i].id;
        bookCard.textContent = myLibrary[i].info();

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
            }
        })

        let toggleRead = document.createElement("button");
        toggleRead.textContent = "Mark as finished";
        toggleRead.classList.add("toggle");
        Btns.appendChild(toggleRead);

        toggleRead.addEventListener("click", () => {
            myLibrary[i].markFinished();
            if (finished === true){
                bookCard.style.color = "white";
                bookCard.style.backgroundColor = "#005A9C";
                toggleRead.textContent = "Mark as unread";
            } else {
                bookCard.style.color = "black";
                bookCard.style.backgroundColor = "LightBlue";
                toggleRead.textContent = "Mark as finished";
            }
        })
        
        libDisplay.appendChild(bookCard);
    }
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

    const title = document.getElementById("title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");

    if (title && author && pages){
        addBookToLibrary(title.value, author.value, pages.value);
        displayBook();
    }
    title.value = "";
    author.value = "";
    pages.value = "";

    newBookForm.close();
});