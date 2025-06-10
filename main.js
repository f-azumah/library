function Book(title, author, pages, isRead){
    if (!new.target) throw Error("You must use the 'new' operator to call this constructor");
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`;
    };
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");
console.log(theHobbit.info());