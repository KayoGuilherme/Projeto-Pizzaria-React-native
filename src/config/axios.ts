import axios from 'axios'

export const api = axios.create({
  baseURL: "http://20.20.0.225:3333",
});