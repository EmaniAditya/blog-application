import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function BlogForm({ blog, isEditing }) {

  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    published: blog?.published || false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEditing 
        ? `${SERVER_URL}/blog/${blog._id}`
        : `${SERVER_URL}/blog`;
      
      const method = isEditing ? 'put' : 'post';
      
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message ||
        'Failed to save blog'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? 'Edit Blog' : 'Create New Blog'}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-3 py-2 border rounded-md h-48"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="mr-2"
          />
          <label className="text-sm font-medium">Publish immediately</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')} Blog
        </button>
      </form>
    </div>
  );
}