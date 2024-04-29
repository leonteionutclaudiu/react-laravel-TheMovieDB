import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Register from 'pages/register';
import Home from 'pages/home';
import ForgotPassword from 'pages/forgot-password';
import PasswordReset from 'pages/password-reset';
import NotFoundPage from 'pages/404';
import MovieDetails from 'components/MovieDetails';
import AppLayout from 'components/Layouts/AppLayout';
import GuestLayout from 'components/Layouts/GuestLayout';
import { useAuth } from 'hooks/auth';
import { SpinnerContext } from './contexts/SpinnerContext';
import { useState } from 'react';
import MovieList from 'components/MovieList';
import { SearchContext } from './contexts/SearchContext';

function App() {
  const { user } = useAuth();
  const [showSpinner, setShowSpinner] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SpinnerContext.Provider value={{ showSpinner, setShowSpinner }}>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>

        <div className="antialiased">
          {user ? <AppLayout>
            <Routes>
            <Route path="/" element={<Home />}/>
                <Route path="/search" element={<MovieList />}/> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-reset/:token" element={<PasswordReset />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="*" element={<NotFoundPage />}
              />
            </Routes>
          </AppLayout> :
            <GuestLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<MovieList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/password-reset/:token" element={<PasswordReset />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="*" element={<NotFoundPage />}
                />
              </Routes>
            </GuestLayout>
          }
        </div>
      </SearchContext.Provider>
    </SpinnerContext.Provider>
  );
}

export default App;
