// import axios from "axios";
const axios = require("axios");

const fetchPicture = (query, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=25101994-7bfa15225df0fe408aedebc37&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits, console.log("api", query, page));
};

export default fetchPicture;
///
// function fetchPicture(q, page) {
//   const KEY = "key=25101994-7bfa15225df0fe408aedebc37";
//   const BASE_URL = `https://pixabay.com/api/?q=${q}&page=${page}&${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
//   const fetchData = fetch(BASE_URL).then((r) => r.json());
//   return fetchData;
// }

// export default fetchPicture;
