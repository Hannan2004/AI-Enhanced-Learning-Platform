import React, { useRef, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import { useLocation } from 'react-router-dom';

// Register the necessary Chart.js components
Chart.register(...registerables);

const Results = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [userDetails, setUserDetails] = useState(null);
  const location = useLocation();
  const { user, scores } = location.state;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        console.log('Fetching user details for user:', user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === 'undergraduate') {
            const graduateDoc = await getDoc(doc(db, 'graduates', user.uid));
            if (graduateDoc.exists()) {
              setUserDetails(graduateDoc.data());
            }
          } else if (userData.role === 'student') {
            setUserDetails(userData);
          }
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Numerical Ability', 'Verbal Ability', 'Logical Reasoning'],
          datasets: [{
            label: 'Scores',
            data: [scores.numerical, scores.verbal, scores.logicalReasoning],
            backgroundColor: ['#4c51bf', '#6b7280', '#10b981'],
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [scores]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    console.log('Generating PDF for user:', user.displayName || user.email); // Debugging log

    doc.text(`Name: ${user.displayName || user.email || 'N/A'}`, 20, 30);

    if (userDetails) {
      doc.text(`Email: ${userDetails.email || 'N/A'}`, 20, 40);
      doc.text(`Role: ${userDetails.role || 'N/A'}`, 20, 50);
      doc.text(`Aspirations: ${userDetails.aspirations || 'N/A'}`, 20, 60);
      doc.text(`Interests: ${userDetails.interests || 'N/A'}`, 20, 70);
      doc.text(`Hobbies: ${userDetails.hobbies || 'N/A'}`, 20, 80);
      doc.text(`Skills: ${userDetails.skills || 'N/A'}`, 20, 90);
      doc.text(`Achievements: ${userDetails.achievements || 'N/A'}`, 20, 100);
      if (userDetails.role === 'undergraduate') {
        doc.text(`CGPA: ${userDetails.cgpa || 'N/A'}`, 20, 110);
        doc.text(`College: ${userDetails.college || 'N/A'}`, 20, 120);
        doc.text(`Contact Number: ${userDetails.contactNumber || 'N/A'}`, 20, 130);
        doc.text(`Degree: ${userDetails.degree || 'N/A'}`, 20, 140);
        doc.text(`DOB: ${userDetails.dob || 'N/A'}`, 20, 150);
        doc.text(`First Name: ${userDetails.firstName || 'N/A'}`, 20, 160);
        doc.text(`Gender: ${userDetails.gender || 'N/A'}`, 20, 170);
        doc.text(`Graduation Year: ${userDetails.graduationYear || 'N/A'}`, 20, 180);
        doc.text(`Internship/Work Experience: ${userDetails.internshipWorkExp || 'N/A'}`, 20, 190);
        doc.text(`Last Name: ${userDetails.lastName || 'N/A'}`, 20, 200);
        doc.text(`Location: ${userDetails.location || 'N/A'}`, 20, 210);
      } else if (userDetails.role === 'student') {
        doc.text(`Contact Number: ${userDetails.contactNumber || 'N/A'}`, 20, 110);
        doc.text(`DOB: ${userDetails.dob || 'N/A'}`, 20, 120);
        doc.text(`Extra Curricular: ${userDetails.extraCurricular || 'N/A'}`, 20, 130);
        doc.text(`Favorite Subjects: ${userDetails.favoriteSubjects || 'N/A'}`, 20, 140);
        doc.text(`First Name: ${userDetails.firstName || 'N/A'}`, 20, 150);
        doc.text(`Gender: ${userDetails.gender || 'N/A'}`, 20, 160);
        doc.text(`Grade: ${userDetails.grade || 'N/A'}`, 20, 170);
        doc.text(`Learning Preferences: ${userDetails.learningPreferences || 'N/A'}`, 20, 180);
        doc.text(`Location: ${userDetails.location || 'N/A'}`, 20, 190);
        doc.text(`Percentage: ${userDetails.percentage || 'N/A'}`, 20, 200);
        doc.text(`School: ${userDetails.school || 'N/A'}`, 20, 210);
        doc.text(`Username: ${userDetails.username || 'N/A'}`, 20, 220);
      }
    }

    doc.autoTable({
      startY: userDetails && userDetails.role === 'undergraduate' ? 230 : 240,
      head: [['Category', 'Score']],
      body: [
        ['Numerical Ability', scores.numerical],
        ['Verbal Ability', scores.verbal],
        ['Logical Reasoning', scores.logicalReasoning],
      ],
    });

    const totalScore = scores.numerical + scores.verbal + scores.logicalReasoning;
    const percentage = ((totalScore / 3) * 100).toFixed(2);

    doc.text(`Total Score: ${totalScore}`, 20, doc.autoTable.previous.finalY + 10);
    doc.text(`Percentage: ${percentage}%`, 20, doc.autoTable.previous.finalY + 20);

    // Add chart to PDF
    const chartCanvas = chartRef.current;
    const chartImage = chartCanvas.toDataURL('image/png');
    doc.addImage(chartImage, 'PNG', 20, doc.autoTable.previous.finalY + 30, 160, 90);

    doc.save('test-results.pdf');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <Sidebar userName={user.displayName || user.email} />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-6 text-indigo-800">Test Results</h1>
          <p className="text-xl mb-4 text-gray-700">Numerical Ability: {scores.numerical}</p>
          <p className="text-xl mb-4 text-gray-700">Verbal Ability: {scores.verbal}</p>
          <p className="text-xl mb-4 text-gray-700">Logical Reasoning: {scores.logicalReasoning}</p>
          <canvas ref={chartRef} width="400" height="200" className="mb-4"></canvas>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPDF}
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Download PDF
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;