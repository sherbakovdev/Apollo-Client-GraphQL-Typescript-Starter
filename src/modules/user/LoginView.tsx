import React, { useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RouteComponentProps } from 'react-router-dom';
import { LoginMutation, LoginMutationVariables } from '../../schemaTypes';

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const LoginView = (props: RouteComponentProps) => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(loginMutation);

  const { password, email } = user;
  return (
    <div>
      <input type='text' name='email' value={email} placeholder='email' onChange={handleChange} />

      <input
        type='password'
        name='password'
        value={password}
        placeholder='password'
        onChange={handleChange}
      />
      <button
        onClick={async () => {
          const response = await login({
            variables: user
          });

          console.log(response);
          props.history.push('/me');
        }}
      >
        Login
      </button>

      {loading && 'Logging'}
    </div>
  );
};

export default LoginView;
