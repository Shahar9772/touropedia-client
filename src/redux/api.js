import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const baseURL = isDev ? REACT_APP_DEV_API : REACT_APP_PROD_API;

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);

export const signUp = (formData) => API.post('/users/signup', formData);

export const googleSignIn = (result) => API.post('/users/googleSignIn', result);

export const createTour = (tourData) => API.post('/tour', tourData);

export const getTours = (page) => {
  console.log(
    process.env.NODE_EVV,
    'kakar&Shahar',
    baseURL,
    `/tour?page=${page}`
  );
  return API.get(`/tour?page=${page}`);
};

export const deleteTour = (tourId) => API.delete(`/tour/${tourId}`);

export const likeTour = (tourId) => API.patch(`/tour/like/${tourId}`);

export const updateTour = (tourId, updatedTourData) =>
  API.patch(`/tour/${tourId}`, updatedTourData);

export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);

export const getTour = (tourId) => API.get(`/tour/${tourId}`);

export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search`, { params: { searchQuery } });

export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);

export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);
