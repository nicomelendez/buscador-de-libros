import './App.css';
import { useState } from 'react';

const API_URL = "https://openlibrary.org/search.json";
const API_URL_COVERS = "https://covers.openlibrary.org/b/";

function App() {

  const [searchInputValue, setSearchInputValue] = useState("");
  const [books, setBooks] = useState([])

  async function searchOnAPI(query){
    
    const response = await fetch(API_URL + "?q=" + query + "?fields=title,frist_publish_year,cover_i,book_year");
    return response.json();

  }

  async function sumbitHandler(e){

    e.preventDefault();

    const {docs} = await searchOnAPI(searchInputValue);

    setBooks(docs.filter(book=> book.edition_count === 1));
    console.log(docs);
  }

  function getCoverURL(query){
    if(query){
      return API_URL_COVERS + "id/" + query + "-M.jpg";
    }else{
      return "https://store.bookbaby.com/BookShop/CommonControls/BookshopThemes/bookshop/OnePageBookCoverImage.jpg?BookID=BK00005009&ImageType=Back";
    }
  }

  return (
    <div className="container">
      <div className='titulo'>
        <h1>Buscador de libros</h1>
      </div>

      <form className='searchForm' onSubmit={sumbitHandler}>
        <input className='search' type="search" placeholder='Nombre del libro...' onChange={(e)=>{
          setSearchInputValue(e.target.value)
        }} />
        <input className='btn-search' type="submit" value="Buscar"/>
      </form>

      <section className='library'>
        {books.map(book=>{
          const cover = getCoverURL(book.cover_i);
          return (
            <article className='book' key={book.key}>
              <h2 className='book-title'>{book.title}</h2>
              <img width="200px" height="250px" src={cover} alt={`Imagen de la portada de ${book.title}`} />
              <span className='book-author'>{book.author_name}</span>
              <span className='book-year'>{book.first_publish_year}</span>
            </article>
          );
        })}
      </section>

    </div>
  );
}

export default App;
