const key = 'c4bd9fc40096a8b6a597f2632930dcad';

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ja&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=ja&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ja&page=2`,
    requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=ja&query=horror&page=1&include_adult=true`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ja&page=1`,
};

export default requests;