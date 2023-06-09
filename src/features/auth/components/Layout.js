import React from 'react';

import logo from '@/assets/logo.svg';
import { Link } from '@/components/Elements';
import { Head } from '@/components/Head';
import { Image } from '@/components/Elements/Image';

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex items-center text-dark" to="/">
              <Image src={logo} alt={'Workflow'} className="h-24 w-24" />
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
        </div>
      </div>
    </>
  );
};
