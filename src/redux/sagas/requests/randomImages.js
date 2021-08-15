import axios from "axios";
export function fetchRandomImages({ count }) {
  return axios.get("https://api.unsplash.com/photos/random", {
    params: { count },
    headers: {
      Authorization: `Client-ID Laa4HJcw4qxFq9aXc6Xpb35AlmZc5cM-rrf0camGYlI`,
    },
  });
}

export function fetchImageDetails({ id }) {
  return axios.get(`https://api.unsplash.com/photos/${id}`, {
    params: {},
    headers: {
      Authorization: `Client-ID Laa4HJcw4qxFq9aXc6Xpb35AlmZc5cM-rrf0camGYlI`,
    },
  });
}

export function fetchImageSearchList({ keyword }) {
  return axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query: keyword, page: 1, per_page: 10 },
    headers: {
      Authorization: `Client-ID Laa4HJcw4qxFq9aXc6Xpb35AlmZc5cM-rrf0camGYlI`,
    },
  });
}
