import React from 'react';
import { NavLink, Link as NLink } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import storage from '@/utils/storage';
import { Link, Button } from '@/components/Elements';
import { LogoutIcon, LoginIcon, PlusCircleIcon } from '@heroicons/react/outline';

const Header = () => {
  const user = storage.getUser();
  const { logout } = useAuth();

  const isLogged = () => storage.getToken();

  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-4 py-3">
      <NLink to="/" className="text-lg font-bold">
        Awesome Product
      </NLink>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/public/products" activeClassName="underline">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="relative">
        {isLogged() ? (
          <>
            <div className="flex items-center space-x-2 text-sm font-medium focus:outline-none">
              <span>
                Welcome, {user.firstName} {user.lastName}
              </span>
              <Link className="" to={`/`}>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={logout}
                  endIcon={<LogoutIcon className="w-4 h-4" />}
                >
                  {' '}
                  Logout
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex justity-between gap-2">
            <Link to="/auth/login" className="text-sm font-medium hover:underline">
              <Button size="sm" endIcon={<LoginIcon className="w-4 h-4" />}>
                {' '}
                Login
              </Button>
            </Link>
            <Link to="/auth/register" className="text-sm font-medium hover:underline">
              <Button size="sm" variant="inverse" endIcon={<PlusCircleIcon className="w-4 h-4" />}>
                {' '}
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
