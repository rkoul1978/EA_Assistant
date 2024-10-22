import React, { createContext, useContext, useState, useCallback } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbackData, setFeedbackData] = useState([]);

  const addFeedback = useCallback((message, isPositive) => {
    setFeedbackData(prevData => [...prevData, { message, isPositive }]);
  }, []);

  return (
    <FeedbackContext.Provider value={{ feedbackData, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedbackContext must be used within a FeedbackProvider');
  }
  return context;
};
