import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    if(username === 'admin' && password === 'admin') {
      login();
      navigate('/');
    }
    else {
      alert('Invalid credentials!');
    }
  };

  return (
    <MainLayout>
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <pre className='text-2xl text-gray-400 mb-4'>
                    Username: admin<br />
                    Password: admin<br />
                </pre>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                    <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded" 
                    required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded" 
                    required />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>

            </form>
        </div>
  </MainLayout>
    
  );
}
