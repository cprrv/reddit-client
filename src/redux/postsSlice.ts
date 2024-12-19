import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, RedditPostApiResponse } from './types';

interface PostsState {
  items: Post[];
  searchTerm: string;
  selectedTopic: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  searchTerm: '',
  selectedTopic: null,
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[], { searchTerm: string, selectedTopic: string | null }>(
  'posts/fetchPosts',
  async ({ searchTerm, selectedTopic }) => {
    const url = searchTerm
      ? `https://www.reddit.com/search.json?q=${encodeURIComponent(searchTerm)}&limit=10`
      : selectedTopic
      ?  `https://www.reddit.com/r/${encodeURIComponent(selectedTopic)}/new.json?limit=10`
      : 'https://www.reddit.com/r/news/new.json?limit=10'; 
    
    const response = await fetch(url);
    const data: RedditPostApiResponse = await response.json();

    if (data && data.data && data.data.children) {
      return data.data.children.map((child) => {
        const image =
          child.data.thumbnail && child.data.thumbnail.startsWith('http')
            ? child.data.thumbnail
            : null;

        return {
          id: child.data.id,
          title: child.data.title,
          selftext: child.data.selftext,
          author: child.data.author,
          subreddit: child.data.subreddit,
          created_utc: child.data.created_utc,
          num_comments: child.data.num_comments,
          image,
          thumbnail: image,
        };
      });
    } else {
      console.log('No posts found or invalid data structure.');
      return [];
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedTopic: (state, action: PayloadAction<string | null>) => {
      state.selectedTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('Fetched posts:', action.payload);
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },  
});

export const { setSearchTerm, setSelectedTopic } = postsSlice.actions;
export default postsSlice.reducer;
