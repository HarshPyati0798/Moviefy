const key = '67feb0611cb89a7eceaa6b789f31d070';
const base_url = 'http://image.tmdb.org/t/p/w185';
const elements = {
    'watched': document.querySelector('.watched'),
    'upcoming': document.querySelector('.upc_list'),
    'pop': document.querySelector('.popular')
};

const displayData = (data,category) => {
    var htmlString = '';
    let url = '';
    data.results.forEach(movie => {
        url = base_url + movie.poster_path;
        // if(!url){
        //     url = '/assets/noimage.jpg';
        // }

        if(movie.id === 537915 || movie.id === 487297){
            url = './../assets/noimage.jpg';
        }

        console.log(movie.adult);
        htmlString = `
            <div style = "display:inline-block;width: 250px;height:300px;margin: 7px;text-align:center;font-size: 20px;">
                <img src = "${url}" style="width:250px;" />
                <p style = "cursor:pointer;text-align:center;text-overflow:ellipsis;line-height: 1.5em;
    height: 3em;"><strong><a href = "/movie/${movie.id}" style="text-decoration:none" target ="_blank">${movie.title}</a></strong></p>
                <p>Release Date:${movie.release_date}</p>
                <p>Rating: ${movie.vote_average}/10</p>
                <button style= "border:1px solid #e22422; background-color: #e22422;border-radius: 5px;width:100px;"><a style="text-decoration:none;font-size: 20px;background:#e22422;"href = "review/${movie.id}" target = "_blank">Rate It</a></button>
            </div>
        `;

        switch(category){
            case 'upcoming':
                elements.upcoming.insertAdjacentHTML('beforeend', htmlString);
                break;
            case 'popular':
                elements.pop.insertAdjacentHTML('beforeend', htmlString);
                break;
        }
        
    });
}

const remove = (id) => {
    console.log(id);
    axios.post('/delete',{
        id: id
    })
        .then((res)=> {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })
}

axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=67feb0611cb89a7eceaa6b789f31d070&language=en-US')
    .then((response) => {
        console.log(response.data);
        displayData(response.data,'upcoming');
    });

axios.get('https://api.themoviedb.org/3/discover/movie?api_key=67feb0611cb89a7eceaa6b789f31d070&language=en-US&sort_by=popularity.desc')
    .then((response) =>{
        console.log('Top Rated ',response.data);
        displayData(response.data,'popular');
    });

/*
    Things remaining: 
        Database connectivity
        Watchlist-Watched-Favorite
        Authentication
        Linking movie to new page with extra details
*/


