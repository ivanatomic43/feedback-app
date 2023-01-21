import { createContext, useState, useEffect } from "react";
import { v4 as uuidvv4} from 'uuid';
import axios from "axios";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/feedback");
      setFeedback(response.data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const deleteFeedback = async (id) => {
    if(window.confirm('Are you sure you want to delete feedback?')){

      await axios.delete(`/feedback/${id}`, {
        id
      });
      setFeedback(feedback.filter((item) =>  item.id !== id))
    }
  }

  const addFeedback = async (newFeedback) => {
    const response = await axios.post('/feedback', {
      rating: newFeedback.rating,
      text: newFeedback.text
    })
    setFeedback([response.data, ...feedback]);
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = async (id, updItem) => {
    const response = await axios.put(`/feedback/${id}`, {
      rating: updItem.rating,
      text: updItem.text
    })
    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...response.data} : item )))
  }
 
  return(
    <FeedbackContext.Provider value={{feedback, deleteFeedback, addFeedback, editFeedback, feedbackEdit, updateFeedback, isLoading}}>
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContext;