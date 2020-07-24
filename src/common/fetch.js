const url = "https://jsonplaceholder.typicode.com/";

export default (link) => {
  const reqLink = url + link;
  return fetch(reqLink).then((req) => req.json())
};
