import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import { Component } from 'react';
import Men from './Components/Men';
import AddProduct from './Components/AddProduct';

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can log the error to an error reporting service
//     console.error(error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render a custom fallback UI here
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }

function App() {
  return (
    // <ErrorBoundary>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='home/men' element={<Men />} />
          <Route exact path='/add-product' element={<AddProduct />} />
        </Routes>
      </div>
    // </ErrorBoundary>
  );
}

export default App;