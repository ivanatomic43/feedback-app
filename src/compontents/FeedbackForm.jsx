import React, { useContext, useEffect } from 'react'
import Card from './shared/Card'
import { useState } from 'react'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {

  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(10);

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit]);


  const handleSubmit = event => {
    event.preventDefault();
    if (text.trim().length > 10){
      const newFeedback = {
        text,
        rating
      }

      if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id, newFeedback)
        setText('');
        setRating(10);
      } else {
        addFeedback(newFeedback);
      }
    }
  }

  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(text);

    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if(text !== '' && text.trim().length < 10){
      setMessage("The review must be minimum 10 characters long.")
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input type="text" placeholder='Write a review' onChange={handleTextChange} value={text}/>
          <Button type="primary" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm