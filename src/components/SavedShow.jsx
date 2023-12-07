import React, { useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';

// お気に入りにsaveされた映画の情報を取ってくる処理
function SavedShow() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  //　左にスライドするボタンの処理 
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  // 右にスライドするボタンの処理
  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // お気に入り（データ）に追加された映画情報をユーザーのメールが変われば、そのタイミングで更新
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShow)
    })
  }, [user?.email])

  const movieRef = doc(db, 'users', `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShow: result,
      })
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">お気に入り</h2>
      <div className="relative flex items-center group">
        <ChevronLeftIcon
          onClick={slideLeft}
          className="bg-white text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={'slider'}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><CloseIcon/></p>
              </div>
            </div>
          ))}
        </div>
        <ChevronRightIcon
          onClick={slideRight}
          className="bg-white text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
}

export default SavedShow;
