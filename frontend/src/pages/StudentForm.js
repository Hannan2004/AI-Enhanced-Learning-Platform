import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase auth and db

const StudentForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    contactNumber: '',
    location: '',
    school: '',
    percentage: '',
    favoriteSubjects: '',
    extraCurricular: '',
    achievements: '',
    learningPreferences: 'Auditory',
    skills: '',
    interests: '',
    aspirations: '',
    hobbies: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get the authenticated user's details
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email.split('@')[0]); // Fetch username or email prefix
      }
    });
    return unsubscribe;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      username,
      grade: '10th', // Explicitly mention 10th grade
    };

    try {
      // Save data directly to Firebase Firestore
      const userId = auth.currentUser?.uid || 'anonymous';
      await setDoc(doc(db, "students", userId), dataToSave);

      setSuccess('Form submitted successfully!');
      setError('');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to submit form. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Form</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">School</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Percentage</label>
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Favorite Subjects</label>
            <input
              type="text"
              name="favoriteSubjects"
              value={formData.favoriteSubjects}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Extra Curricular</label>
            <input
              type="text"
              name="extraCurricular"
              value={formData.extraCurricular}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Achievements</label>
            <input
              type="text"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Learning Preferences</label>
            <select
              name="learningPreferences"
              value={formData.learningPreferences}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Auditory">Auditory</option>
              <option value="Visual">Visual</option>
              <option value="Practical">Practical</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Interests</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Aspirations</label>
            <input
              type="text"
              name="aspirations"
              value={formData.aspirations}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Hobbies</label>
            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;