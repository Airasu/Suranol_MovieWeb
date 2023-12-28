const form = document.getElementById("myForm")
const searchValue = document.getElementById("value")
const container = document.getElementById("container");
const imageUrl = "http://image.tmdb.org/t/p/w500/"

form.addEventListener("submit",(e)=>{
    e.preventDefault()  
    const value = searchValue.value
    console.log(value)
    search_movies(value)

})

const show_upcoming_movies = async () =>{
    const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1");
    const data = await response.json();
    container.innerHTML = data.results.map((data)=>(
        `<button ondblclick=show_movie_details(${data.id})>
        <img src=${imageUrl + data.backdrop_path}>
        <h3>${data.original_title}</h3>
        </button>`
    ))
}

const search_movies = async (name) =>{
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1bfdbff05c2698dc917dd28c08d41096&query=${name}`);
    const data = await response.json();
    container.innerHTML = data.results.map((data)=>(
        `<button>
        <img src=${imageUrl + data.backdrop_path}>
        <h3>${data.original_title}</h3>
        </button>`
    ))
}

const show_movie_details = async (id) =>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US`);
    const data = await response.json();

    const similar_movies = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1`)
    const similar_movies_data = await similar_movies.json()

    container.innerHTML = 
    `<div>
    <h1>Title: ${data.original_title}</h1>
    <span>Overview: ${data.overview}</span> 
    <div>
    <h1>Similar Movies  </h1>
    ${similar_movies_data.results.map((data)=>(`<button>
        <img src=${imageUrl + data.backdrop_path}>
        <h3>${data.original_title}</h3>
        </button>`
    ))}
    </div>
     </div> `;
}




show_upcoming_movies()