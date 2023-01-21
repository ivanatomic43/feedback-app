import { motion, AnimatePresence} from 'framer-motion';
import FeedbackItem from './FeedbackItem';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';

function FeedbackList() {

  const { feedback, isLoading } = useContext(FeedbackContext);

  if(!isLoading && (!feedback || feedback.length === 0)){
    return <p>No feedback yet.</p>
  }

  const renderedFeedback = feedback.map((item) => {
    return(
      <motion.div key={item.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <FeedbackItem key = {item.id} item={item} />
      </motion.div>
    );
  });

  let content;

  content = isLoading ? <Spinner /> : <div className='feedback-list'>
                                              <AnimatePresence>
                                                {renderedFeedback}
                                              </AnimatePresence>
                                            </div>

  return (
    <>
      {content}
    </>
  )
}

export default FeedbackList