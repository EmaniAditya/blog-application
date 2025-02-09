import { useState, useEffect } from 'react';
import { blogApi } from '../../utils/api';
import { BlogCard } from './BlogCard';
import { BlogCardSkeleton, Loading } from '../layout/Loading';

export function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getAll();
        // console.log(response);
        if (response.data && Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
        } else {
          setError('Invalid response format: "blogs" is not an array');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (error)
    return <div className="text-red-500 text-center">{`Error: ${error}`}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array(6)
            .fill()
            .map((_, i) => <BlogCardSkeleton key={i} />)
        ) : blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div>No blogs available.</div>
        )}
      </div>
    </div>
  );
}
