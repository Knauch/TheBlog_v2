import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  //changed in the Login component
  const [authState, setAuthState] = useState(false)

  //to check whether ayth was done before
  useEffect(() => {

    axios.get('http://localhost:3001/auth/login', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
   .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });


  }, [])

  return (
    <div className="App">
      {/* context stuff so that from every component that is inside AuthContext you can access the state that you put as value for the context */}
      <AuthContext.Provider value={
        { authState, setAuthState }
      }>
        <Router>
          <div className="navbar">
            <Link to='/'>Home Page</Link>
            <Link to='/createpost'>Create Post</Link>
            {!authState && (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/registration'>Registration</Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
