const page = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await result.json();
  return (
    <main className="grid grid-cols-3 gap-4 p-4">
      {posts?.map((post) => (
        <article className="shadow p-3 rounded-md hover:shadow-lg space-y-2 " key={post.id}>
          <h3 className="font-semibold text-sm uppercase  ">{post?.title}</h3>
          <p className="text-sm">{post?.body}</p>
        </article>
      ))}
    </main>
  );
};

export default page;
