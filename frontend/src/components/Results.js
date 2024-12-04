import React, { useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Chart } from 'chart.js';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { motion } from 'framer-motion';

const Results = ({ userName, scores }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Numerical Ability', 'Verbal Ability', 'Logical Reasoning'],
        datasets: [{
          label: 'Scores',
          data: [scores.numerical, scores.verbal, scores.logical],
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
  }, [scores]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(`Name: ${userName}`, 20, 30);

    doc.autoTable({
      startY: 40,
      head: [['Category', 'Score']],
      body: [
        ['Numerical Ability', scores.numerical],
        ['Verbal Ability', scores.verbal],
        ['Logical Reasoning', scores.logical],
      ],
    });

    const totalScore = scores.numerical + scores.verbal + scores.logical;
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
      <Sidebar userName={userName} />
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
          <p className="text-xl mb-4 text-gray-700">Logical Reasoning: {scores.logical}</p>
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