import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { info } from '../../api/todoApi';
import Posts from '../Posts/Posts';


const Home = () => {
    const testQuery = useQuery({queryKey:["test"], queryFn: info})

  return (
    <div>
      <h1>Welcome to Home</h1>

      {testQuery.isLoading && <p>Loading Data...</p>}
      {testQuery.isError && <p>{JSON.stringify(testQuery.error)}</p>}
      
      <h2>{testQuery?.data?.info}</h2>

      {testQuery.data && <Posts/>}
    </div>
  );
};

export default Home;
