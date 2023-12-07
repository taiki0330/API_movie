import React, { useEffect, useState } from 'react'
import requests from '../Request'
import axios from 'axios';

function Main() {
// 映画が追加される度に状態を監視する、初期値は空配列
  const [movies, setMovies] = useState([]);
// ランダムに映画を一つ取得
  const movie = movies[Math.floor(Math.random() * movies.length)]
// TopRatedの映画APIを取得
  useEffect(() => {
    axios.get(requests.requestTopRated).then((response) => {
      setMovies(response.data.results)
    })
  }, [])
  // console.log(movie)

// 説明文が150を超える時は、...を付ける
  const threeDots = (str, num) => {
    if(str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  }

  return (
    <div className='w-full h-[550px]'>
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>        
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {movie?.title}
          </h1>
          <div className='my-4'>
            <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>再生</button>
            <button className='border text-white border-gray-300 py-2 px-5 ml-4'>あとで観る</button>
          </div>
          <p className="text-gray-400 text-sm py-5">公開日: {movie?.release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{threeDots(movie?.overview, 150)}</p>
        </div>
      </div>
    </div>
  )
}

export default Main