import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, RedditCommentApiResponse } from './types';

interface CommentsState {
  items: Comment[];
  postId: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  items: [],
  postId: null,
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchComments',
  async (postId) => {
    const url = `https://www.reddit.com/comments/${postId}.json`;
    const response = await fetch(url);
    const data: RedditCommentApiResponse = await response.json();

    if (Array.isArray(data) && data[1] && data[1].data) {
      return data[1].data.children.map((child: { data: RedditCommentApiResponse['data']['children'][0]['data'] }) => ({
        id: child.data.id,
        author: child.data.author,
        body: child.data.body,
        created_utc: child.data.created_utc,
        score: child.data.score,
      }));
    } else {
      console.log('No comments found or invalid data structure.');
      return [];
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      });
  },
});

export default commentsSlice.reducer;
