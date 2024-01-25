import Container from './layout/Container';
import Footer from './layout/Footer';
import HashtagList from './hashtags/HashtagList';
import { useEffect } from 'react';
import { useFeedbackItemsStore } from '../stores/feedbackItemsStore';

function App() {
  const getFeedbackList = useFeedbackItemsStore(state => state.getFeedbackList);
  useEffect(() => {
    getFeedbackList();
  }, [getFeedbackList]);
  return (
    <div className='app'>
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
