import React from 'react';
import Main from './Main';
import Row from './Row';
import requests from '../Request';

function Home() {
  return (
    <>
{/* ホーム画面の表示（Nav以外） */}
      <Main />
      <Row rowID="1" title="Upcoming" fetchURL={requests.requestUpcoming} />
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID="4" title="Horror" fetchURL={requests.requestHorror} />
      <Row rowID="5" title="TopRated" fetchURL={requests.requestTopRated} />
    </>
  );
}

export default Home;
