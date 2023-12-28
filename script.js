const container = document.getElementById("container");
const imageUrl = "http://image.tmdb.org/t/p/w500/"
const show_upcoming_movies = async () =>{
    const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=1bfdbff05c2698dc917dd28c08d41096&language=en-US&page=1");
    const data = await response.json();
    container.innerHTML = data.results.map((data)=>(
        `<button>
        <img src=${imageUrl + data.backdrop_path}>
        <h3>${data.original_title}</h3>
        </button>`
    ))
}
show_upcoming_movies()