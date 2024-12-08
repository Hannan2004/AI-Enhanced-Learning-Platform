import React from 'react';
import { useLocation } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const ReportGraduate = () => {
  const location = useLocation();
  const { recommendation, roadmap } = location.state;

  // Handle the roadmap parsing safely
  const parseRoadmap = (data) => {
    try {
      if (typeof data === 'string') {
        // Remove any markdown formatting if present
        const cleanJson = data.replace(/```json\n|\n```/g, '');
        return JSON.parse(cleanJson);
      }
      return data;
    } catch (error) {
      console.error('Error parsing roadmap:', error);
      return null;
    }
  };

  const parsedRoadmap = parseRoadmap(roadmap);

  if (!parsedRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Error Loading Roadmap
          </h1>
          <p className="text-center text-gray-600">
            There was an error loading the career roadmap. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Career Roadmap for {recommendation.career}
      </h1>
      <VerticalTimeline>
        {parsedRoadmap.careerRoadmap.phases.map((phase, index) => (
          <VerticalTimelineElement
            key={index}
            date={phase.phaseName}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          >
            <h3 className="vertical-timeline-element-title">{phase.phaseName}</h3>
            <ul className="mt-4 list-disc pl-4">
              {phase.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="mb-2 text-gray-700">{step}</li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default ReportGraduate;