/**
 * !This file is not used in the final version of the app.
 * !It was used to test the context API and custom hooks.
 * !It is kept here for reference.
 * !The final version of the app uses Zustand for state management.
 * * We can find the Zustand version of this file in src/store/feedbackItems.ts
 *
 *  */

// import { createContext, useMemo, useState } from 'react';
// import { TFeedbackItem } from '../lib/types';
// import { useFeedbackItems } from '../lib/hooks';

// type TFeedbackItemsContext = {
//   filteredFeedbackList: TFeedbackItem[];
//   companyList: string[];
//   addFeedbackItem: (text: string) => void;
//   setSelectedHash: (hash: string) => void;
// };

// type TFeedbackItemsContextProvider = {
//   children: React.ReactNode;
// };

// export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
//   null
// );

// function FeedbackItemsContextProvider({
//   children,
// }: TFeedbackItemsContextProvider) {
//   const { feedbackList, setError, setFeedbackList } = useFeedbackItems();

//   const [selectedHash, setSelectedHash] = useState('');

//   const filteredFeedbackList: TFeedbackItem[] = useMemo(
//     () =>
//       selectedHash === ''
//         ? feedbackList
//         : feedbackList.filter(
//             item => item.company.toLocaleUpperCase() === selectedHash
//           ),
//     [feedbackList, selectedHash]
//   );

//   const companyList = useMemo(
//     () => [
//       ...new Set(
//         feedbackList.reduce(
//           (acc, item) => acc.concat(item.company.toUpperCase()),
//           new Array<string>()
//         )
//       ),
//     ],
//     [feedbackList]
//   );

//   const postFeedbackItem = async (item: TFeedbackItem) => {
//     try {
//       await fetch(
//         'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
//         {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(item),
//         }
//       );
//       // const data = await res.json();
//       // console.log(data, res);

//       // if (!res.ok) {
//       //   throw new Error(data.message);
//       // }
//     } catch (e) {
//       setError(
//         'Something went wrong sending the feedback. Please try again later.'
//       );
//     }
//   };

//   const addFeedbackItem = async (text: string) => {
//     const companyName = text
//       .split(' ')
//       .find(word => word.includes('#'))!
//       .substring(1);

//     const newItem: TFeedbackItem = {
//       id: new Date().getTime(),
//       company: companyName,
//       text: text,
//       upvoteCount: 0,
//       badgeLetter: companyName.substring(0, 1)!.toUpperCase(),
//       daysAgo: 0,
//     };
//     await postFeedbackItem(newItem);
//     setFeedbackList([...feedbackList, newItem]);
//   };

//   return (
//     <FeedbackItemsContext.Provider
//       value={{
//         addFeedbackItem,
//         companyList,
//         setSelectedHash,
//         filteredFeedbackList,
//       }}
//     >
//       {children}
//     </FeedbackItemsContext.Provider>
//   );
// }
// export default FeedbackItemsContextProvider;
