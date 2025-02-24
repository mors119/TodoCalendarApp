import axios from 'axios';

export const todos = axios.create({
  baseURL: 'http://localhost:8080/api/todos',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export const main = axios.create({
  baseURL: 'http://localhost:8080/api/main',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});
