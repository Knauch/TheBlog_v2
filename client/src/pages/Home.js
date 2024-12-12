import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  const [listofPosts, setListofPosts] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then((respons) => {
        setListofPosts(respons.data)

      })
  }, [])

  return (
    <div>
      {listofPosts.map((val, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              navigate(`/post/${val.id}`)
            }}>
            <div className="title"> {val.title} </div>
            <div className="body">{val.postText}</div>
            <div className="footer">{val.username}</div>
          </div>
        );


      })}
    </div>
  )
}

export default Home
