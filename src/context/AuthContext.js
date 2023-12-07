import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// AuthContextとしてデータを共有できるようにする
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  
  // メールとパスワードをもってサインアップし、データベースに空配列を作成する
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email), {
      savedShow: []
    })
  }
  // メールとパスワードをもってサインインする処理を返す
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // メールとパスワードを保持したままサインアウト
  function logOut(email, password) {
    return signOut(auth);
  }
  // ログイン中のユーザーによってその中の表示を変える
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });
  // 上の関数たちを共有されるAuthデータによって呼び出す
  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
// propsを経由させずにデータを扱える
export function UserAuth() {
  return useContext(AuthContext);
}
