import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getTours = createAsyncThunk(
  'tour/getTours',
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page);
      return response.data;
    } catch (error) {
      if (!error.response) {
        error.response = { data: { message: error.message } };
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  'tour/searchTours',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedTours = createAsyncThunk(
  'tour/getRelatedTours',
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(tags);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByTag = createAsyncThunk(
  'tour/getToursByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagTours(tag);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  'tour/getToursByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  'tour/getTour',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  'tour/deleteTour',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success('Tour Deleted Successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  'tour/likeTour',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  'tour/updateTour',
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(id, updatedTourData);
      toast.success('Tour Updated Successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      navigate('/');
      toast.success('Tour Added successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: 'tour',
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: 0,
    error: '',
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTours.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getToursByTag.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [getToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.tagTours = action.payload;
    },
    [getToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRelatedTours.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.relatedTours = action.payload;
    },
    [getRelatedTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchTours.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.tours = action.payload;
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTour.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTour.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      const {
        arg: { id },
      } = action.meta;
      state.userTours = state.userTours.filter((tour) => tour._id !== id);
      state.tours = state.tours.filter((tour) => tour._id !== id);
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';

      const {
        arg: { id },
      } = action.meta;
      state.userTours = state.userTours.map((tour) =>
        tour._id === id ? action.payload : tour
      );
      state.tours = state.tours.map((tour) =>
        tour._id === id ? action.payload : tour
      );
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeTour.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      const { arg: id } = action.meta;
      if (id) {
        // state.userTours = state.userTours.map((tour) =>
        //   tour._id === id ? action.payload : tour
        // );
        state.tours = state.tours.map((tour) =>
          tour._id === id ? action.payload : tour
        );
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
