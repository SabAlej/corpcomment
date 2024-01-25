/**
 * !This file is not used in the project.
 * !It is just a reference for custom hooks.
 * !The custom hooks were used with the Context API.
 * *The Context API was replaced with Zustand Store.
 */

// import { useContext, useEffect, useState } from 'react';
// import { FeedbackItemsContext } from '../contexts/FeedbackItemsContextProvider';
// import { TFeedbackItem } from './types';

// export const useFeedbackItemsContext = () => {
//   const context = useContext(FeedbackItemsContext);
//   if (!context) {
//     throw new Error(
//       'useFeedbackItemsContext must be used within a FeedbackItemsContextProvider'
//     );
//   }
//   return context;
// };

// export const useFeedbackItems = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [feedbackList, setFeedbackList] = useState<TFeedbackItem[]>([]);

//   const getFeedbackList = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
//       );
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message);
//       }

//       setFeedbackList(data.feedbacks);
//     } catch (e) {
//       setError('Something went wrong. Please try again later.');
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     getFeedbackList();
//   }, []);

//   return { feedbackList, setError, setFeedbackList, loading, error };
// };
