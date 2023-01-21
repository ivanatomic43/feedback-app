import React from "react";
import FeedbackList from "./compontents/FeedbackList";
import Header from "./compontents/Header";
import FeedbackStats from "./compontents/FeedbackStats";
import FeedbackForm from "./compontents/FeedbackForm";
import { BrowserRouter as Router, Route, Routes}  from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import AboutIconLink from "./compontents/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

function App(){

  return(
    <FeedbackProvider>
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route
            exact path='/'
            element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            }></Route>
          <Route path='/about' element={<AboutPage />}/>
        </Routes>

        <AboutIconLink />
      </div>
    </Router>
    </FeedbackProvider>
  );
}

export default App;