import React, { useRef, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';

// Register the necessary Chart.js components
Chart.register(...registerables);

const Results = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [userDetails, setUserDetails] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { user, scores } = location.state;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        console.log('Fetching user details for user:', user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const email = user.email;

          let userCollection;

          if (userData.role === '10th Grade Student') {
            userCollection = 'students';
          } else if (userData.role === 'Graduate/Undergraduate') {
            userCollection = 'graduates';
          }

          if (userCollection) {
            const q = query(collection(db, userCollection), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                const filteredData = {
                  name: data.name,
                  timestamp: data.timestamp,
                  contact: data['contact no'],
                  role: data['user role'],
                  aspirations: data.aspirations,
                  interests: data.interests,
                  workExperience: data.workexperience,
                  hobbies: data.hobbies,
                  degree: data.degree,
                };
                setUserDetails(filteredData);
              });
            } else {
              console.log('No user found in', userCollection, 'with email:', email);
            }
          }
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

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

    console.log('Generating PDF for user:', user.displayName || user.email);

    doc.text(`Email: ${user.displayName || user.email || 'N/A'}`, 20, 30);

    Object.entries(userDetails).forEach(([key, value], index) => {
      if (value) {
        doc.text(`${key}: ${value}`, 20, 40 + index * 10);
      }
    });

    doc.autoTable({
      startY: Object.keys(userDetails).length * 10 + 50,
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
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-4"
          >
            Download PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/report')}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Know Your Career by Uploading the Result
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
