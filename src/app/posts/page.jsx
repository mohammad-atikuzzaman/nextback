import PostCard from "@/components/PostCard";
import getPosts from "@/utils/fetchPostsApi";

const page = async () => {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-indigo-200 px-4 py-10">
      {/* Page heading */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Explore Insightful Posts
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Discover articles tailored for learning, curiosity, and innovation.
        </p>
      </section>

      {/* Card grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
};

export default page;
