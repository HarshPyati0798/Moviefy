const key = '67feb0611cb89a7eceaa6b789f31d070';
const base_url = 'http://image.tmdb.org/t/p/w154';
const ids = {
    'search': document.getElementById('search'),
    'input': document.querySelector('.movie-name'),
    'search_results': document.getElementById('search-results'),
    'results_list':document.querySelector('.results_list'),
    'watchlist': document.querySelector('.watchl'),
    'favorite': document.querySelector('.fav'),
    'watched': document.querySelector('.watchd')
};

const flag = false;

ids.search.addEventListener("click",() => {
    const searchedMovie = ids.input.value;
    ids.results_list.innerHTML = '<h1></h1>';
    console.log(searchedMovie);
    axios.get('https://api.themoviedb.org/3/search/movie?query='+searchedMovie+'&api_key=67feb0611cb89a7eceaa6b789f31d070')
        .then((response) => {
            console.log(response.data);
            formattedData(response.data);
        })
},false);

const add = (type,id,url,title) => {
    //document.querySelector('.btn').styles.border = 'none';
    console.log(url,title,id,type);
    const bodyData = JSON.stringify({
        id: id,
        url: url,
        title: title,
        type: type 
    });
    console.log(bodyData);
    axios.post('/save', {
        id:id,
        url: url,
        title: title,
        type: type
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    
   // document.querySelector('.btn').styles.border = none;
}

const formattedData = (data) => {
    var htmlString = '';
    //console.log(data);
    data.results.forEach(movie => {
        console.log(movie.title,':',movie.id);
        let url = base_url + movie.poster_path;
        if(!url){
            url = './assets/noimage.jpg';
        }
        htmlString = `
            <div class = "result_single">
                <img src = ${url}  style = "float:left; margin-right:15px;"/>
                <h2><strong><a href = "/movie/${movie.id}" target ="_blank">${movie.title}</a></strong></h2>
                <p>Description: ${movie.overview}</p>
                <p>Release Date:${movie.release_date}</p>
                <p>Rating: ${movie.vote_average}/10</p>
                <button style = "border:1px solid white;cursor:pointer;border-radius:10px;height: 40px;font-size:16px;width: 100px;" class = "btn"onclick = "add('watchlist',${movie.id},'${base_url + movie.poster_path}','${movie.title}')">Add to Watchlist</button>
                <button style = "border:1px solid white;cursor:pointer;border-radius:10px;height: 40px;font-size:16px;width: 100px;" class = "btn" onclick = "add('favorite',${movie.id},'${base_url + movie.poster_path}','${movie.title}')" >Add to Favorites</button>
                <button style = "border:1px solid white;cursor:pointer;border-radius:10px;height: 40px;font-size:16px;width: 180px;" class = "btn"onclick = "add('watched',${movie.id},'${base_url + movie.poster_path}','${movie.title}')">Watched Already?</button>
                <button style = "border:1px solid white;cursor:pointer;border-radius:10px;height: 40px;font-size:16px;width: 100px;" class = "btn" onclick = "add('favorite',${movie.id},'${base_url + movie.poster_path}','${movie.title}')" ><a href="/review/${movie.id}" target="_blank"style="background:none;" class="link">Rate It!<s/a></button>
            </div>
            <br/><br/><br/><br/>
        `;
        ids.results_list.insertAdjacentHTML('beforeend',htmlString);
    });
}




