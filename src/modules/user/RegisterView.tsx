import React, { useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RouteComponentProps } from 'react-router-dom';
import { RegisterMutation, RegisterMutationVariables } from '../../schemaTypes';

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
  }
`;

export const RegisterView = (props: RouteComponentProps) => {
  const [user, setUser] = useState({ email: '', password: '', username: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const [register, { loading }] = useMutation<RegisterMutation, RegisterMutationVariables>(
    registerMutation
  );

  const { password, email, username } = user;
  return (
    <div>
      <input type='text' name='email' value={email} placeholder='email' onChange={handleChange} />

      <input
        type='text'
        name='username'
        value={username}
        placeholder='username'
        onChange={handleChange}
      />

      <input
        type='password'
        name='password'
        value={password}
        placeholder='password'
        onChange={handleChange}
      />
      <button
        onClick={async () => {
          const response = await register({
            variables: user
          });

          if (response.data && response.data.register) {
            props.history.push('/login');
          }
        }}
      >
        Register
      </button>

      {loading && 'Registering'}
    </div>
  );
};

export default RegisterView;
