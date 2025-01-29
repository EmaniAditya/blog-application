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
