import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/create-blog" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
              <Route path="/blog/edit/:id" element={<PrivateRoute><BlogForm isEditing /></PrivateRoute>} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}



// // Inside ErrorBoundary.jsx

// class ErrorBoundary extends React.Component {
//   state = { hasError: false, errorMessage: '' };

//   static getDerivedStateFromError(error) {
//     return { hasError: true, errorMessage: error.message };
//   }

//   componentDidCatch(error, info) {
//     console.error('Error caught by ErrorBoundary:', error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="text-center text-red-500">
//           <h2>Something went wrong.</h2>
//           <p>{this.state.errorMessage}</p>
//           <p>Please try again later.</p>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export { ErrorBoundary };
