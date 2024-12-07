import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const CareerRoadmapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roadmap = location.state?.roadmap;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Career Roadmap</h1>
      <VerticalTimeline>
        {roadmap?.roadmap.map((phase, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date={phase.phase}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          >
            <h3 className="vertical-timeline-element-title">{phase.phase}</h3>
            <ul>
              {phase.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ul>
            <h4 className="vertical-timeline-element-subtitle">Resources</h4>
            <ul>
              {phase.resources.map((resource, resourceIndex) => (
                <li key={resourceIndex}><a href={resource} target="_blank" rel="noopener noreferrer">{resource}</a></li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default CareerRoadmapPage;