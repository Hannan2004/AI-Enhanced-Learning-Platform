import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('10th Grade Student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      username,
      password,
      role,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/auth/signup', userData);
      setSuccess('Signup successful!');
      setError('');

      const userId = response.data.userId; // Get the userId from the response

      // Redirect based on role and pass the userId
      if (role === '10th Grade Student') {
        navigate('/student-form', { state: { userId } });
      } else if (role === 'Graduate/Undergraduate') {
        navigate('/graduate-form', { state: { userId } });
      } else if (role === 'Professional') {
        navigate('/professional-form', { state: { userId } });
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="10th Grade Student">10th Grade Student</option>
              <option value="Graduate/Undergraduate">Graduate/Undergraduate</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;