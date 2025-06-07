const { default: clientPromise } = require("../mongodb");

export const getPostsCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  const posts = db.collection("posts");
  return posts;
};
