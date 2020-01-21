import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { MeQuery } from '../../schemaTypes';

const meQuery = gql`
  query MeQuery {
    me {
      id
      email
    }
  }
`;

const MeView = () => {
  const { data, loading } = useQuery<MeQuery>(meQuery);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Data is undefined</div>;
  }

  if (!data.me) {
    return <div>received no user</div>;
  }

  return <div>I'm {data.me.email}</div>;
};

export default MeView;
