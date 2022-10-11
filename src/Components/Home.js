import { Button, Card } from '@shopify/polaris'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home(props) {
  let profileNavigate = useNavigate();
  var handleViewProfile = () => {
    profileNavigate('/userprofile')
  }
  return (
    <div className='cc'>
      {(props.userData !== undefined && props.userData.message !== 'Not Found') ? (<Card sectioned>
        <div className='userCard'>
          <img src={props.userData.avatar_url} alt="s" />
          <div className='userDetails'>
            <span className='userName'>{props.userData.login}{" "}
              <Button plain
                onClick={() => handleViewProfile()}> View profile</Button></span>
            <p>{props.userData.bio}</p>
            <div className='follow'>
              <span>{props.userData.followers} <b>Followers</b></span>
              <span>{props.userData.following} <b>Following</b></span>
              <span>{props.userData.public_repos} <b>Repos</b></span>
              <p></p>
            </div>
          </div>
        </div>
      </Card>) : <h1>
        No User Found
      </h1>}
    </div>

  )
}
export default Home