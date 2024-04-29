import MovieList from 'components/MovieList';
import { useAuth } from 'hooks/auth';

const Dashboard = () => {
  const { user } = useAuth({ middleware: 'auth' });

  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div>{user ? `Welcome, ${user.name} !` : 'Welcome !'}</div>
            </div>
          </div>
        </div>
      </div>
      <MovieList />
    </>
  );
}

export default Dashboard;
