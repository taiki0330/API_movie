import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


function Movie({ item }) {
// お気に入りをlikeとして状態を監視する
  const [like, setLike] = useState(false);
// 保存された映画をsavedとして状態を監視する
  const [saved, setSaved] = useState(false);
// ユーザー情報を取得
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`)

// お気に入り映画を保存する処理
  const saveShow = async () => {
    if(user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShow: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      })
    } else {
      alert('保存する映画を選んでください')
    }
  }

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FavoriteIcon className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FavoriteBorderIcon className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
}

export default Movie;
