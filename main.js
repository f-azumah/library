const myLibrary = [];
const libDisplay = document.querySelector(".display");

function Book(title, author, pages){
    if (!new.target) throw Error("You must use the 'new' operator to call this constructor");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    };
}

function addbookToLibrary(title, author, pages){
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

addbookToLibrary("Wahala", "Nikki May", 384);
console.log(myLibrary)

function displayBook(){
    libDisplay.textContent = "";
    for (let i = 0; i < myLibrary.length; i++){
        let bookCard = document.createElement('div');
        bookCard.setAttribute(
            "style", "background-color: LightBlue; box-sizing: border-box; border-radius: 20px; width: 400px; height: 100px; box-shadow: 5px 5px 10px grey"
        )
        bookCard.classList.add("bookCard")
        bookCard.textContent = myLibrary[i].info();;
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
        addbookToLibrary(title.value, author.value, pages.value);
        displayBook();
    }
    title.value = "";
    author.value = "";
    pages.value = "";

    newBookForm.close();
});