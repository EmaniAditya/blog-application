import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { BlogList } from './components/blog/BlogList';
import { BlogDetail } from './components/blog/BlogDetail';
import { BlogForm } from './components/blog/BlogForm';
import { Navbar } from './components/layout/Navbar';
import { PrivateRoute } from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route 
              path="/create-blog" 
              element={
                <PrivateRoute>
                  <BlogForm />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/blog/edit/:id" 
              element={
                <PrivateRoute>
                  <BlogForm isEditing />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;