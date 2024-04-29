import React from 'react';
import Navigation from 'components/Layouts/Navigation'
import { useAuth } from 'hooks/auth'
import Footer from './Footer';
import Spinner from 'components/Spinner';

const AppLayout = ({ header, children }) => {
  const { user } = useAuth({ middleware: 'auth' });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-primary via-secondary to-tertiary">
      <Navigation user={user} />
      {/* Page Heading */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-2 md:py-6 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header>
      <main className='py-20 md:py-14 px-2 sm:px-6 lg:px-8'>
        {children}
        {/* Spinner */}
        <Spinner/>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AppLayout;
