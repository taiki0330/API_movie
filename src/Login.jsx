import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from './context/AuthContext';

// ログインページのコンポーネント
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-[#1b082f] fixed top-0 left-0 w-full h-full h-screen">
      <div className="fixed w-full px-4 z-50 py-10">
        <div className="max-w-[450px] h-[600px] mx-auto bg-[#140524] text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>
            {error ? (
              <p className="p-3 bg-red-400 my-2">
                メールまたはパスワードが違います
              </p>
            ) : null}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-gray-700 rounded"
                type="email"
                placeholder="メール"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-gray-700 rounded"
                type="password"
                placeholder="パスワード"
                autoComplete="current-password"
              />
              <button className="bg-red-600 py-3 my-6 rounded font-bold">
                Sign In
              </button>
              <div className="py-4">
                <span className="text-gray-600">初めての方ですか？</span>{' '}
                <Link to="/signup">SignUp</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
