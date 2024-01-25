import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import type { TFeedbackItem } from '../../lib/types';
import { useState } from 'react';

type FeedbackItemProps = {
  item: TFeedbackItem;
};

function FeedbackItem({ item }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvote, setUpvote] = useState(item.upvoteCount);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    console.log(id);

    setOpen(!open);
  };

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setUpvote(prev => ++prev);
    e.currentTarget.disabled = true;
  };
  return (
    <li
      className={open ? 'feedback feedback--expand' : 'feedback'}
      onClick={e => handleClick(e)}
      id={item.id.toString()}
    >
      <button onClick={handleUpvote}>
        {!open && <TriangleUpIcon />}
        <span>{upvote}</span>
        {open && <TriangleDownIcon />}
      </button>
      <div>
        <p>{item.badgeLetter}</p>
      </div>
      <div>
        <p>{item.company}</p>
        <p>{item.text}</p>
      </div>

      <p>{item.daysAgo === 0 ? 'NEW' : item.daysAgo + 'd'}</p>
    </li>
  );
}
export default FeedbackItem;
