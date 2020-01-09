import axios, { AxiosResponse } from 'axios'
import { INote } from '../models/note';

axios.defaults.baseURL = 'https://5e15b69b21f9c90014c3d59e.mockapi.io/'
const responseBody = (response: AxiosResponse) => response.data;
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url: string) =>
    axios
      .get(url).then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body).then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body).then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url).then(sleep(1000))
      .then(responseBody),
};


const Notes = {
  list: () => requests.get(`/notes/`),
  details: (id: string) => requests.get(`/notes/${id}`),
  create: (note: INote) => requests.post('/notes', note),
  update: (note: INote) => requests.put(`/notes/${note.id}`, note),
  delete: (id: string) => requests.del(`/notes/${id}`),
};



export default { Notes };