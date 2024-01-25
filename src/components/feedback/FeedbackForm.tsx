import { useState } from 'react';
import { MAX_CHARACTERS } from '../../lib/constants';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const onAddFeedbackItem = useFeedbackItemsStore(
    state => state.addFeedbackItem
  );

  const charCount = MAX_CHARACTERS - feedback.length;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    text.length <= MAX_CHARACTERS && setFeedback(text);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedback.includes('#') && feedback.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 2000);
    }

    onAddFeedbackItem(feedback);
    setFeedback('');
  };
  return (
    <form
      className={`form ${showValidIndicator && 'form--valid'} ${
        showInvalidIndicator && 'form--invalid'
      }`}
      onSubmit={handleSubmit}
    >
      <textarea
        id='feedback-textarea'
        value={feedback}
        placeholder=''
        spellCheck={false}
        onChange={handleChange}
      />
      <label htmlFor='feedback-textarea'>
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className='u-italic'>{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
export default FeedbackForm;
