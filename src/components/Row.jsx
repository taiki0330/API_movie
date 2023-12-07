import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from './Movie';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// それぞれのジャンルごとに映画を横一列に並べる
function Row({ title, fetchURL, rowID }) {

    // moviesにsetMoviesで追加し、状態を更新
    const [movies, setMovies] = useState([]);
    
    // urlが変わるタイミングで更新されてデータを呼び出す
    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    console.log(movies)

    // 左にスライドするボタンの処理
    const slideLeft = () => {
        const slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    // 右にスライドするボタンの処理
    const slideRight = () => {
        const slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative flex items-center group">
                <ChevronLeftIcon onClick={slideLeft} className='bg-white text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
                <div id={"slider" + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movies.map((item, id) => (
                        <Movie key={id} item={item}/>
                    ))}
                </div>
                <ChevronRightIcon onClick={slideRight} className='bg-white text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
            </div>
        </>
    )
}

export default Row