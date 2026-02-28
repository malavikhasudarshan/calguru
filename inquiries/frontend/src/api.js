import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

export const getComments = () => API.get('/comments').then(res => res.data);
export const postComment = (comment) => API.post('/comments', comment).then(res => res.data);