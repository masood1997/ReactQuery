import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/todoApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useBlog();
  const userRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setIsAuthenticated({ accessToken: data?.data?.accessToken });
      setEmail('');
      setPassword('');
    }
  });

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const handleLoginForm = async (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });;
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-4 bg-opacity-40 bg-gray-400 rounded-lg shadow-lg">
        {loginMutation.isError && (
          <p ref={errorRef} className="Error">
            {JSON.stringify(loginMutation?.error?.response?.data?.message)}
          </p>
        )}

        <form className="flex flex-col space-y-4" onSubmit={handleLoginForm}>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
            <input
              className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <input
              className="font-nunito text-lg p-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button className="font-nunito text-xl mt-4 px-4 py-2 rounded-lg bg-lime-500">Sign In</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
