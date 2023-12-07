import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Nav() {

  // logOutによってuserを呼び出す監視状態を作成
  const { user, logOut } = UserAuth();
  // ナビゲート（ページ遷移）をインスタンス化
  const navigate = useNavigate();

  // ログアウトしたらホームに飛ぶ処理
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-[#9152d4] text-4xl font-bold cursor-pointer">
          MyMovie
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4">アカウント</button>
          </Link>
            <button onClick={handleLogOut} className="bg-[#9152d4] px-6 py-2 rounded cursor-pointer">
              ログアウト
            </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">SignIn</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer">
              SignUp
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
