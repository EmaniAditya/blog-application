import { useState, useEffect } from 'react';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/blog')
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 m-4">
          <h2 className="text-xl">{blog.title}</h2>
          <p>{blog.content.slice(0, 150)}...</p>
          <a href={`/blog/${blog._id}`} className="text-blue-500">Read more</a>
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
