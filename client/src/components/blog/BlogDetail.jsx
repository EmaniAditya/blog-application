import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogApi } from '../../utils/api';

export function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogApi.getOne(id);
        setBlog(response.data.blog);
      } catch (err) {
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this blog?'
    );
    if (isConfirmed) {
      try {
        await blogApi.delete(id, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate('/');
      } catch (err) {
        setError('Failed to delete blog');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!blog) return <div className="text-center">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-8">{blog.content}</p>
      {token && (
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/blog/edit/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
