import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';
import HashtagItem from './HashtagItem';

function HashtagList() {
  const getCompanyList = useFeedbackItemsStore(state => state.getCompanyList());
  const setSelectHash = useFeedbackItemsStore(state => state.setSelectHash);
  return (
    <ul className='hashtags'>
      <li>
        <button id='reset' onClick={() => setSelectHash('')}>
          {'RESET FILTERS'}
        </button>
      </li>
      {getCompanyList.map(hash => (
        <HashtagItem key={hash} hash={hash} onSelectHash={setSelectHash} />
      ))}
    </ul>
  );
}
export default HashtagList;
