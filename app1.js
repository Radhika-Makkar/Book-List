class Book
{
  constructor(title,author,isbn)
  {
    this.title=title;
    this.author=author;
    this.isbn=isbn;
  }
}
class store{

    static getBook()
    {
        let books;
        if(localStorage.getItem('books')===null)
        {
            books=[];
        }
        else
        {
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book)
    {
        const books=store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static deleteBook(isbn)
    {
        const books=store.getBook();
    books.forEach((book,index)=>
    {
        if(book,isbn===isbn)
        {
            books.splice(index,1);
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
}
}
class UI
{
  static displayBook()
  {
    const storedBook=store.getBook();

  const books=storedBook;

  books.forEach((book) => UI.addtoList(book));
}
 static addtoList(book)
 {
   const list =document.querySelector('#book-list');
   const row=document.createElement('tr');
   row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
 `;

 list.appendChild(row);
 }
 static deleteBook(el)
 {
if(el.classList.contains('delete'))
{
    el.parentElement.parentElement.remove();

}
 }
 static showAlert(message,className)
 {
     const div=document.createElement('div');
     div.className=`alert alert-${className}`;
     div.appendChild(document.createTextNode(message));
     const container=document.querySelector('.container');
     const form=document.querySelector('#book-form');
     container.insertBefore(div, form);
 
     //vanish in 3 seconds;
     setTimeout(() => document.querySelector('.alert').remove(), 3000);

 }



 
 static clearfields()
 {
     document.querySelector('#title').value='';
     document.querySelector('#author').value='';
     document.querySelector('#isbn').value='';
 }
}
//display a book
document.addEventListener('DOMContentLoaded',UI.displayBook);

//add a book
document.querySelector('#book-form').addEventListener('submit', (e) => 
{
e.preventDefault();

const title= document.querySelector('#title').value;
const author= document.querySelector('#author').value;
const isbn= document.querySelector('#isbn').value;

if((title=="")||(author=="")||(isbn==""))
{
  UI.showAlert('please fill all details','danger');

}
else{
const book=new Book(title, author, isbn);



UI.addtoList(book);

store.addBook(book);


UI.showAlert('Book Added','success');


UI.clearfields();


}
});

//delete a book

document.querySelector('#book-list').addEventListener('click',(e)=>
{
    UI.deleteBook(e.target);


store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
//message for deelting a bbok

UI.showAlert('Book deleted','warning');
});
