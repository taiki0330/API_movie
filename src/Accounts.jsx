import React from 'react';
import SavedShow from './components/SavedShow';

// お気に入りページ（アカウントページ）のコンポーネント
function Accounts() {
  return (
    <>
      <div className="absolute top-[20%] p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold">お気に入り</h1>
      </div>
      <div className='absolute top-[40%] overflow-x-scroll whitespace-nowrap scrollbar-hide'>
        <SavedShow />
      </div>
    </>
  );
}

export default Accounts;
