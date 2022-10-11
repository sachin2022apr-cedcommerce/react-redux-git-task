import { Card, Tabs } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Actions/userAction'

function UserProfile(props) {
  var [userData, setUserData] = useState({});
  var homeNavigate = useNavigate()
  useEffect(() => {
    if (props.state.userName !== "") {
      // https://api.github.com/users/user_name
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
      var k = sessionStorage.getItem("userName")
      console.log(k);
    }
  }, [props.state.userName])
  // console.log(userData);

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'Overview',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'repositories',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Projects',
      panelID: 'repeat-customers-content-1',
    }
  ];

  return (
    <div className='cc2'>
      <div className='homeHead'>
        <div className='basicDetails'>
          <img src={userData.avatar_url} />
        </div>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {(selected === 0) ? <>0</> : (selected === 1) ? <>1</> : <>2</>}
        </Tabs>
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