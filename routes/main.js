const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const axios = require('axios');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Map global promise to get rid of warnings
mongoose.Promise = global.Promise;

// connecting to mongo
mongoose.connect('mongodb://localhost/moviefy',{
    useNewUrlParser: true,
    })
    .then(() => {
        console.log('MongoDB connected ....');
    })
    .catch(() => {
        console.log('There was an error in connecting to DB');
    });

require('./../models/Movie');
require('./../models/Save');

const Movie = mongoose.model('Movies');
const Save = mongoose.model('Save');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/rate',(req,res,next) => {
    res.render('html/rate',{
        path:'/rate'
    });
});

router.get('/profile',(req,res,next) => {
    Save.find({})
        .sort({date:'desc'})
        .then(savedMovie => {
            res.render('html/profile',{
                path:'/profile',
                movies: savedMovie
            });
        })
    
});

// if(!err){
        //     console.log('deleted');
        //     res.redirect('/');
        // }
// ,req.body,(err,data)=> {
        
//     }

router.post('/delete',(req,res,next) => {
    Save.findOneAndDelete({id: req.body.id})
        .then(result => result.redirect('/profile'))
        .catch(err => console.log(err));
});

router.get('/movie/:movieId',(req,res,next) => {
    const movieId = parseInt(req.url.split('/')[2]);
    let apiData = null;
    console.log(movieId);
    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=67feb0611cb89a7eceaa6b789f31d070&language=en-US')
        .then(response => {
            apiData = response.data;
            console.log(apiData);
            res.render('html/indi_movie',{apiData: apiData}); 
        });
});

router.get('/review/:movieId',(req,res,next) => {
    const movieId = parseInt(req.url.split('/')[2]);
    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=67feb0611cb89a7eceaa6b789f31d070&language=en-US')
        .then(response => {
            apiData = response.data;
            console.log(apiData);
            res.render('html/rate',{
                apiData: apiData
            });
        });
});

router.post('/reviewed/:movieId',(req,res,next) => {
    const movieId = parseInt(req.url.split('/')[2]);
    const base_url = 'http://image.tmdb.org/t/p/w154';
    console.log('MoId',movieId);
    const review = req.body.rating;
    let reviewDetail = req.body.review;
    if(!reviewDetail){
        reviewDetail = '';
    }
    console.log('review',review);
    console.log('reviewDetail',reviewDetail);
    let apiData = null;
    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=67feb0611cb89a7eceaa6b789f31d070&language=en-US')
        .then(response => {
            apiData = response.data;
            const newMovie = {
                url: "/movie/" + movieId,
                title: apiData.title,
                rating: review,
                description: reviewDetail
            };
            new Movie(newMovie)
                .save()
                .then(movie => {
                    res.redirect('/activity');
                })
            //console.log('apidata',apiData)       
        });
});

router.get('/activity',(req,res) => {
    // res.render('html/activity');
    Movie.find({})
        .sort({date: 'desc'})
        .then(movie => {
            res.render('html/activity',{
                movies: movie
            })
        });
});

router.post('/save',(req,res) => {
    //console.log(req.body);
    console.log('In the post route');
    const time = new Date();
    console.log('Body sent',req.body);
    const data = {
        id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        url: req.body.url
    };
    console.log('data',data);
    new Save(data)
        .save()
        .then((rese) => {
            res.sendStatus(201);
        });
});

router.get('/saved',(req,res) => {

});

router.get('/',(req,res,next) => {
    res.render('html/main_screen',{
       path:'/' 
    });
});



module.exports = router;