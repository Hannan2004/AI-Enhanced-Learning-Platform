import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Results = ({ scores }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Test Results', 20, 10);
    doc.autoTable({
      head: [['Category', 'Score']],
      body: [
        ['Numerical Ability', scores.numerical],
        ['Verbal Ability', scores.verbal],
        ['Logical Reasoning', scores.logical],
      ],
    });
    doc.save('test-results.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Test Results</h1>
        <p className="text-xl mb-4">Numerical Ability: {scores.numerical}</p>
        <p className="text-xl mb-4">Verbal Ability: {scores.verbal}</p>
        <p className="text-xl mb-4">Logical Reasoning: {scores.logical}</p>
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