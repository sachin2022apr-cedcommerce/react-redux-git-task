import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../Actions/userAction'

function Header({ user, setUser, setUserData, userData, userDisplay }) {
  var homeNavigate = useNavigate();
  var handleSearch = (event) => {
    if (event.key === "Enter") {
      searchUser()
      userDisplay(user)
      sessionStorage.setItem("userName", user);
      homeNavigate('/')
    }
  }
  var searchUser = () => {
    fetch(`https://api.github.com/users/${user}`, {
      headers: {
        Authorization: `Bearer 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`
      }
    })
      .then((res) => res.json())
      .then((user) => {
        setUserData({ ...user })
      })
  }
  return (
    <div className='header'>
      <div className='headLeft'>
        <img src='./gitLogo.png' alt='logo' />
        <input type="text"
          onChange={(event) => setUser(event.target.value)}
          onKeyDown={(event) => handleSearch(event)}
          value={user}
          placeholder='search username' />
        <span>Pull requests</span>
        <span>Issues</span>
        <span>Marketplace</span>
        <span>Explore</span>
      </div>
      <div className='headRight'>
        <span><i className="fa-regular fa-bell fa-xl"></i></span>
        <img src='./user.png' alt='logo' />
      </div>
    </div>
  )
}
const MapStateToProps = (state) => {
  return {
    state
  }
}
const MapDispatchToProps = (dispatch) => {
  return {
    userDisplay: (b) => dispatch(getUser(b))
  }
}
export default connect(MapStateToProps, MapDispatchToProps)(Header);