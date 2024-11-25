import './App.css';

import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {

  const [listofPosts, setListofPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then((respons) => {

        setListofPosts(respons.data)

      })
  }, [])


  return (
    <div className="App">
      {listofPosts.map((val, key) => {
        return (
          <div className="post">
            <div className="title"> {val.title} </div>
            <div className="body">{val.postText}</div>
            <div className="footer">{val.username}</div>
          </div>
        );


      })}
    </div>
  );
}

export default App;
