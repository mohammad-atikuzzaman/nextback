const getCommentsOfPost = async (id) => {
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  const comments = await result.json();
  return comments;
};

export default getCommentsOfPost
