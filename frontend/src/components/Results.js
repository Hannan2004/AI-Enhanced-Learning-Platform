import React, { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Chart from 'chart.js/auto';

const Results = ({ scores }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Numerical Ability', 'Verbal Ability', 'Logical Reasoning'],
        datasets: [{
          label: 'Scores',
          data: [scores.numerical, scores.verbal, scores.logical],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [scores]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();
    const userName = 'John Doe'; // Dummy user name

    doc.text('Test Results', 20, 10);
    doc.text(`Date: ${date}`, 20, 20);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Test Results</h1>
        <p className="text-xl mb-4">Numerical Ability: {scores.numerical}</p>
        <p className="text-xl mb-4">Verbal Ability: {scores.verbal}</p>
        <p className="text-xl mb-4">Logical Reasoning: {scores.logical}</p>
        <canvas ref={chartRef} width="400" height="200" className="mb-4"></canvas>
        <button
          onClick={downloadPDF}
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Results;