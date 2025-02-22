import { Link } from 'react-router-dom';

export function Navbar() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold mr-1">
              Blog App
            </Link>
            <span className="text-sm text-gray-600 mt-1">
              by{' '}
              <a
                href="https://emaniaditya.github.io"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aditya
              </a>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link
                  to="/create-blog"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  New Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
