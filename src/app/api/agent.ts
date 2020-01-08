import axios, {AxiosResponse} from 'axios'
import { INote } from '../models/note';

const responseBody = (response: AxiosResponse) => response.data;
axios.defaults.baseURL = 'https://5e15b69b21f9c90014c3d59e.mockapi.io/' 


const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(responseBody);
  }
};


const Notes = {
    list: () => requests.get(`/notes/`),
    details: (id: string) => requests.get(`/notes/${id}`),
    create: (note: INote) => requests.post('/notes', note),
    update: (note: INote) => requests.put(`/notes/${note.id}`, note),
    delete: (id: string) => requests.del(`/notes/${id}`),
  };
  


  export default{ Notes};