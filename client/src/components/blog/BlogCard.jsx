import { Link } from 'react-router-dom';

export function BlogCard({ blog }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          Read more →
        </Link>
        {!blog.published && (
          <span className="text-sm text-gray-500 italic">Draft</span>
        )}
      </div>
    </div>
  );
}