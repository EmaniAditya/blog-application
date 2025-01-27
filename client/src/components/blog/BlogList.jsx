import { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogCard } from './BlogCard';
import { BlogCardSkeleton } from '../layout/Loading';

SERVER_URL = process.env.SERVER_URL

export function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/blog`);
        setBlogs(response.data.blogs);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array(6).fill().map((_, i) => <BlogCardSkeleton key={i} />)
          : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        }
      </div>
    </div>
  );
}