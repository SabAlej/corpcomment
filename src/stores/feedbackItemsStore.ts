import { create } from 'zustand';
import { TFeedbackItem } from '../lib/types';

type TStore = {
  feedbackList: TFeedbackItem[];
  isLoading: boolean;
  error: string;
  selectedHash: string;
  getCompanyList: () => string[];
  getFilteredList: () => TFeedbackItem[];
  postFeedbackItem: (item: TFeedbackItem) => Promise<void>;
  addFeedbackItem: (text: string) => Promise<void>;
  setSelectHash: (hash: string) => void;
  getFeedbackList: () => Promise<void>;
};

export const useFeedbackItemsStore = create<TStore>((set, get) => ({
  feedbackList: [] as TFeedbackItem[],
  isLoading: false,
  error: '',
  selectedHash: '',
  getCompanyList: () => {
    const feedbackList = get().feedbackList;
    return [
      ...new Set(
        feedbackList.reduce(
          (acc, item) => acc.concat(item.company.toUpperCase()),
          new Array<string>()
        )
      ),
    ];
  },
  getFilteredList: () => {
    const feedbackList = get().feedbackList;
    const selectedHash = get().selectedHash;
    return selectedHash === ''
      ? feedbackList
      : feedbackList.filter(
          item => item.company.toLocaleUpperCase() === selectedHash
        );
  },

  postFeedbackItem: async (item: TFeedbackItem): Promise<void> => {
    try {
      await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }
      );
    } catch (e) {
      set(() => ({
        error:
          'Something went wrong sending the feedback. Please try again later.',
      }));
    }
  },
  addFeedbackItem: async (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      company: companyName,
      text: text,
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1)!.toUpperCase(),
      daysAgo: 0,
    };
    await get().postFeedbackItem(newItem);
    set(() => ({
      feedbackList: [...get().feedbackList, newItem],
    }));
  },
  setSelectHash: (hash: string) => {
    set(() => ({ selectedHash: hash }));
  },
  getFeedbackList: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      set(() => ({ feedbackList: data.feedbacks }));
    } catch (e) {
      set(() => ({
        error: 'Something went wrong. Please try again later.',
      }));
    }
    set(() => ({ isLoading: false }));
  },
}));
