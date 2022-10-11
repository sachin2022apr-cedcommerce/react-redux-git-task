import './App.css';
import Home from './Components/Home';
import '@shopify/polaris/build/esm/styles.css';
import UserProfile from './Components/UserProfile';
import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import { useState } from 'react';
function App() {
  let [user, setUser] = useState("");
  let [userData, setUserData] = useState()
  return (
    <div className="App">
      <Header user={user} setUser={setUser} setUserData={setUserData} userData={userData}/>
      <Routes>
        <Route path='/' element={<Home userData={userData}/>} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
