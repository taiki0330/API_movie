import { Route, Routes } from 'react-router-dom';
import Accounts from './Accounts';
import './App.css';
import Login from './Login';
import requests from './Request';
import Signup from './Signup';
import Main from './components/Main';
import Nav from './components/Nav';
// import Row from './components/Row';
import AuthContextProvider from './context/AuthContext';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

// ここがメインのコンポーネント！
function App() {

  return (
    <div className="App">
      {/* 全てにAuth情報をContextでグローバルに管理 */}
      <AuthContextProvider>
        <Nav />
        {/* ページ遷移にはRoutes */}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/account' element={<ProtectedRoute><Accounts /></ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
      </div>
  );
}

export default App;
