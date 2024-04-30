import ApplicationLogo from 'components/ApplicationLogo'
import Dropdown from 'components/Dropdown'
import ResponsiveNavLink, { ResponsiveNavButton } from 'components/ResponsiveNavLink'
import { DropdownButton } from 'components/DropdownLink'
import { useAuth } from 'hooks/auth'
import { useContext, useEffect, useState } from 'react'
import CustomNavLink from 'components/NavLink';
import { Link, NavLink } from 'react-router-dom';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from 'components/SearchBar'
import { getMovieGenres } from '../../utils/getMovieGenres'
import { SpinnerContext } from '../../contexts/SpinnerContext'

const Navigation = ({ user }) => {

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const { showSpinner, setShowSpinner } = useContext(SpinnerContext);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getMovieGenres(apiKey, apiUrl, setShowSpinner);
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-tertiary shadow-md z-10 fixed top-0 left-0 right-0">
      {/* Primary Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
              </Link>
            </div>
            {/* Navigation Links */}
            <div className="hidden space-x-8 sm:-my-px sm:flex">
              {user && <CustomNavLink
                to="/dashboard"
              >
                Dashboard
              </CustomNavLink>}
            </div>
          </div>
          <div className="hidden sm:flex gap-6 sm:items-center md:ml-6">
            <SearchBar />
            <Dropdown align="right"
              width="48"
              trigger={
                <button className="flex items-center text-sm font-medium
                 text-gray-500 hover:text-gray-700 focus:outline-none
                 transition duration-150 ease-in-out">
                  <p className='text-2xl text-primary hover:text-underline transition'>Genres</p>
                </button>
              }>
              {genres.map(genre => (
                <Link key={genre.id} to={`/genre/${genre.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{genre.name}</Link>
              ))}
            </Dropdown>
          </div>
          {/* Settings Dropdown */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <Dropdown
              align="right"
              width="48"
              trigger={
                <button className="flex items-center text-sm font-medium
                 text-gray-500 hover:text-gray-700 focus:outline-none
                 transition duration-150 ease-in-out">
                  <div>{user ? user.name : <FontAwesomeIcon icon={faRightToBracket} className='text-2xl text-primary hover:text-gray-800 transition' />}</div>
                  {user && <div className="ml-1">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>}
                </button>
              }>
              {/* Authentication */}
              {user ? <DropdownButton onClick={logout}>
                Logout
              </DropdownButton> :
                <>
                  <NavLink to='/login' className={({ isActive }) =>
                    isActive ? 'font-bold w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out' : 'w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out'
                  }>Login</NavLink>
                  <NavLink to='/register' className={({ isActive }) =>
                    isActive ? 'font-bold w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out' : 'w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out'
                  }>Register</NavLink>
                </>
              }
            </Dropdown>
          </div>
          {/* Hamburger */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(open => !open)}
              className="inline-flex items-center justify-center p-2
              rounded-md text-gray-400 hover:text-gray-500
              hover:bg-gray-100 focus:outline-none focus:bg-gray-100
               focus:text-gray-500 transition duration-150 ease-in-out">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                {open ? (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Responsive Navigation Menu */}
      {open && (
        <div className="block sm:hidden">
          {user && <div className="pt-2 pb-3 space-y-1 w-fit mx-auto">
            <ResponsiveNavLink
              to="/dashboard"
            >
              Dashboard
            </ResponsiveNavLink>
          </div>}
          {/* Responsive Settings Options */}
          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-4 flex-col gap-4">
              <div className="sm:hidden flex flex-col gap-6 mx-auto justify-center items-center md:ml-6">
                <SearchBar />
                <Dropdown align="right"
                  width="48"
                  trigger={
                    <button className="flex items-center text-sm font-medium
                 text-gray-500 hover:text-gray-700 focus:outline-none
                 transition duration-150 ease-in-out">
                      <p className='text-2xl text-primary hover:text-underline transition'>Genres</p>
                    </button>
                  }>
                  {genres.map(genre => (
                    <Link key={genre.id} to={`/genre/${genre.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{genre.name}</Link>
                  ))}
                </Dropdown>
              </div>
              <div className="ml-3">
                <div className="font-medium text-base text-gray-800">
                  {user?.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 w-fit mx-auto">
              {/* Authentication */}
              {user ? <ResponsiveNavButton onClick={logout}>
                Logout
              </ResponsiveNavButton> : <div className='flex flex-col w-fit mx-auto mt-6 items-center justify-center gap-4'>
                <NavLink to='/login' className={({ isActive }) =>
                  isActive ? 'font-bold w-full text-left block px-4 py-2 text-lg leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out' : 'w-full text-left block px-4 py-2 text-lg leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out'
                }>Login</NavLink>
                <NavLink to='/register' className={({ isActive }) =>
                  isActive ? 'font-bold w-full text-left block px-4 py-2 text-lg leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out' : 'w-full text-left block px-4 py-2 text-lg leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out'
                }>Register</NavLink>
              </div>}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
