import React, { useRef, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import { useLocation, useNavigate } from 'react-router-dom';

// Register the necessary Chart.js components
Chart.register(...registerables);

const Results = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [userDetails, setUserDetails] = useState(null);
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
          const email = user.email; // Email to use for querying
          let userCollection;

          // Determine which collection to query based on the role
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
                setUserDetails(doc.data());
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
      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      // Fetch user details and update the chart
      const fetchUserData = async () => {
        try {
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
  
            if (userDoc.exists()) {
              const userData = userDoc.data();
  
              console.log('Fetched user data:', userData);
  
              // Use the fetched username and role in your chart labels or options if needed
              const username = userData.username || 'N/A';
              const role = userData.role || 'N/A';
  
              // Create a new chart instance
              const ctx = chartRef.current.getContext('2d');
              chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: ['Numerical Ability', 'Verbal Ability', 'Logical Reasoning'],
                  datasets: [{
                    label: `${username} - ${role}`, // Include username and role in the chart label
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
            } else {
              console.log('No user document found for user ID:', user.uid);
            }
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchUserData();
    }
  }, [scores, user]);
  

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    console.log('Generating PDF for user:', user.displayName || user.email); // Debugging log
  
    // Add PDF title with styling
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Career Guidance Test Results', 105, 20, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Your personalized results and insights for career planning.', 105, 30, { align: 'center' });
  
    // Draw a horizontal line to separate sections
    doc.setDrawColor(0, 0, 0);
    doc.line(15, 35, 195, 35);
  
    doc.setFontSize(14);
doc.text('User Information:', 20, 45);
doc.setFontSize(12);
doc.setFont('helvetica', 'italic');
doc.text(`Name: ${userDetails.username || 'N/A'}`, 20, 55); // Include the username
doc.text(`Email: ${user.email || 'N/A'}`, 20, 65);
doc.text(`Role: ${user.role || 'N/A'}`, 20, 75); // Include the role

// Add a box around user details
doc.setDrawColor(150, 150, 150);
doc.rect(15, 40, 180, 40); // Adjust the height to fit all fields
console.log('User Details in PDF:', userDetails);

  
    // Add additional user details
    if (userDetails) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Personal Details:', 20, 90);
  
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Aspirations: ${userDetails.aspirations || 'N/A'}`, 20, 100);
      doc.text(`Interests: ${userDetails.interests || 'N/A'}`, 20, 110);
      doc.text(`Skills: ${userDetails.skills || 'N/A'}`, 20, 120);
  
      // Add a box around personal details
      doc.setDrawColor(150, 150, 150);
      doc.rect(15, 85, 180, 50);
    }
  
    // Add scores table with better styling
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Test Scores:', 20, 145);
  
    doc.autoTable({
      startY: 155,
      head: [['Category', 'Score']],
      body: [
        ['Numerical Ability', scores.numerical],
        ['Verbal Ability', scores.verbal],
        ['Logical Reasoning', scores.logicalReasoning],
      ],
      theme: 'grid', // Change to a grid layout for better visuals
      headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] }, // Dark header with white text
      styles: { halign: 'center', fontSize: 12 },
      bodyStyles: { textColor: [0, 0, 0] }, // Black text for the body
    });
  
    // Add chart to the PDF
    const chartCanvas = chartRef.current;
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL('image/png');
      const finalY = doc.autoTable.previous.finalY + 10;
  
      // Adding the chart with a border
      doc.addImage(chartImage, 'PNG', 20, finalY, 160, 90);
      doc.setDrawColor(150, 150, 150);
      doc.rect(20, finalY, 160, 90);
    }
  
    // Add footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(
      'Generated by AI-Driven Career Guidance Tool. © 2024 Udaan Technologies. All rights reserved.',
      pageHeight / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  
    // Save the PDF
    doc.save('Career-Guidance-Test-Results.pdf');
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
