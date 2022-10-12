import { Card } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'

export default function Repositories({ userData }) {
  var [polularRepo, setPolularRepo] = useState([])
  useEffect(() => {
    fetch(`https://api.github.com/users/${userData.login}/repos`, {
      headers: {
        Authorization: `Bearer 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`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPolularRepo(data);
      })
  }, [userData])
  var visibility = <span className='visibility'>Public</span>
  return (
    <div className='popularRepo'>
      {polularRepo.map((item, index) => {
        return <Card title={item.name} actions={[{ content: visibility }]} sectioned>
          <article className='userDescription'>{item.description}</article>
          <article className='dateOver'>Updated on {item.updated_at}</article>
        </Card>
      })}
    </div>
  )
}