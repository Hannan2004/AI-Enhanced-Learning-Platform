import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase auth and db
import FileUpload from './FileUpload';
import ResumeForm from './ResumeForm';

const ResumeUploader = () => {
  const navigate = useNavigate();
  
  // Add authentication check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    gender: 'Male',
    location: '',
    companyName: '',
    jobTitle: '',
    experience: '',
    skills: '',
    domainExpertise: '',
    coursesCertifications: '',
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);

    const formData = new FormData();
    formData.append('resume', file);

    axios.post('http://localhost:3001/fetchDetails', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      setFormData(response.data);
    })
    .catch(error => {
      console.error('Error fetching details:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAndNext = async () => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }

      const userId = auth.currentUser.uid;

      // Basic form validation
      const requiredFields = ['firstName', 'lastName', 'phone', 'companyName'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
        return;
      }

      // Save form data to Firestore
      await setDoc(doc(db, 'professionalForms', userId), {
        ...formData,
        userId,
        timestamp: new Date().toISOString(),
        userType: 'professional'  // Add user type for easier querying
      });

      navigate('/skill-question', { 
        state: { 
          job: formData,
          userType: 'professional' 
        } 
      });
    } catch (error) {
      console.error('Error saving details:', error);
      alert('Failed to save details: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-800">Upload Resume</h1>
        <FileUpload handleFileChange={handleFileChange} />
        <ResumeForm formData={formData} handleChange={handleChange} />
        <button
          onClick={handleSaveAndNext}
          className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default ResumeUploader;