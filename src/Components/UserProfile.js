import { Badge, Button, Tabs } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Actions/userAction'
import { HeartMajor } from '@shopify/polaris-icons';
import Overview from './Overview';
import Repositories from './Repositories';

function UserProfile(props) {
  var [userData, setUserData] = useState({});
  const [selected, setSelected] = useState(0);

  var homeNavigate = useNavigate()
  useEffect(() => {
    if (props.state.userName !== "") {
      fetch(`https://api.github.com/users/${props.state.userName}`, {
        headers: {
          Authorization: `Bearer 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`
        }
      })
        .then((res) => res.json())
        .then((user) => {
          setUserData(user);
        })
    } else {
      if (sessionStorage.getItem("userName") === null) {
        homeNavigate('/')
      }
      props.userDisplay(sessionStorage.getItem("userName"));
    }
  }, [props.state.userName])

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );
  const tabs = [
    {
      id: '0',
      content: 'Overview'
    },
    {
      id: '1',
      content: (
        <span>
          Repositories <Badge status="new">{userData.public_repos}</Badge>
        </span>)
    }
  ];
  return (
    <div className='cc2'>
      <div className='homeHead'>
        <div className='basicDetails'>
          <img src={userData.avatar_url} alt='' />
          <span className='name'>{userData.name}</span>
          <span className='user'>{userData.login}</span>
          <span className='bio'>{userData.bio}</span>
          <div className='btnDiv'>
            <Button>Follow</Button>
            <Button icon={HeartMajor} color="critical">Sponsor</Button>
          </div>

          <span className='flll'><i class="fa-solid fa-users"></i> {" "}{userData.followers} <b>Followers</b> <i class="fa-solid fa-circle fa-2xs"></i> {userData.following} <b>Following</b>
          </span>

          {(userData.location !== null) ? <span className='address'><i class="fa-solid fa-location-dot">
          </i> {userData.location}</span> : <></>}

          {(userData.email !== null) ? <span className='address'><i class="fa-regular fa-envelope">
          </i> {userData.email}</span> : <></>}

          {(userData.blog !== "") ? <span className='address'><i class="fa-solid fa-link"></i> {userData.blog}</span> : <></>}

          {(userData.twitter_username !== null) ? <span className='address'><i class="fa-brands fa-twitter"> </i> {userData.twitter_username}</span> : <></>}

        </div>
        <div className='otherDetails'>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            {(selected === 0) ? <div className='detailsCard'>
              <Overview userData={userData} />
            </div> : <div className='detailsCard'>
              <Repositories userData={userData} />
            </div>}
          </Tabs>
        </div>
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
export default connect(MapStateToProps, MapDispatchToProps)(UserProfile)