const getPosts = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts?limit=10");
  const posts = await result.json();
  return posts;
};

export const getSpecificPostById = async (id) => {
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await result.json();
  return post;
};

export default getPosts;
