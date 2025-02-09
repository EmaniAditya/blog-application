import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogApi } from '../../utils/api';

export function BlogForm({ blog, isEditing }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    published: blog?.published || false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isEditing && id) {
      const fetchBlog = async () => {
        try {
          const response = await blogApi.getOne(id);
          setFormData({
            title: response.data.title,
            content: response.data.content,
            published: response.data.published,
          });
        } catch (err) {
          setError('Failed to load the blog for editing');
        }
      };
      fetchBlog();
    }
  }, [isEditing, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = isEditing ? 'update' : 'create';
      const url = isEditing ? `/blog/${id}` : '/blog';

      const response = isEditing
        ? await blogApi.update(id, formData)
        : await blogApi.create(formData);

      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to save blog'
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
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md h-48"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="mr-2"
          />
          <label className="text-sm font-medium">Publish immediately</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'} Blog
        </button>
      </form>
    </div>
  );
}
