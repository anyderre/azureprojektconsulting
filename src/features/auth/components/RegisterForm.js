import * as React from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export const RegisterForm = ({ onSuccess }) => {
  const { register, isRegistering } = useAuth();

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors['username']}
              registration={register('username')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <div>
              <Button isLoading={isRegistering} type="submit" className="w-full">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm">
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            home
          </Link>
        </div>
        <div className="text-sm">
          <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
