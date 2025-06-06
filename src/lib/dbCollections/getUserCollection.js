const { default: clientPromise } = require("@/lib/mongodb");

export const getUserCollection = async () => {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");
  return users;
};
