import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";

function Post() {

  let { id } = useParams()
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([])
  const [newComments, setNewComments] = useState('')


  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });

  }, [id]);

  const addComment = () => {

    axios.post(`http://localhost:3001/comments`, {
      commentBody: newComments,
      PostId: id
    },
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        }
      }

    ).then((response) => {

      if (response.data.error) {
        alert(response.data.error)
      } else {
        //grabing new comment and adding to the list so no need to refresh the page and fetch updated comments
        const commentToAdd = { 
          commentBody: newComments,
          username: response.data.username
        }
        setComments([...comments, commentToAdd]); // Append new comment
        setNewComments(''); // Clear input field
      }

    });

  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">

        <div className="addCommentContainer">
          <input
            type="text"
            value={newComments} // Two-way binding for clearing input
            placeholder="Add your comment"
            onChange={(event) => {
              setNewComments(event.target.value)
            }}
          />
          <button className="my-button" onClick={addComment} disabled={!newComments.trim()}>Add Comment</button>

        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div className="comment" key={key}>
                {comment.commentBody}
                <label for={key}>{comment.username}</label>
              </div>
            )
          })}

        </div>

      </div>
    </div>
  )
}

export default Post
