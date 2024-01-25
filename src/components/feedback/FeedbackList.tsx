import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

function FeedbackList() {
  const loading = useFeedbackItemsStore(state => state.isLoading);
  const error = useFeedbackItemsStore(state => state.error);
  const filteredFeedbackList = useFeedbackItemsStore(state =>
    state.getFilteredList()
  );
  return (
    <ol className='feedback-list'>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {filteredFeedbackList.map(item => (
        <FeedbackItem item={item} key={item.id} />
      ))}
    </ol>
  );
}
export default FeedbackList;
