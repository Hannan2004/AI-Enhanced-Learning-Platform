import React from 'react';
import { useLocation } from 'react-router-dom';
import mermaid from 'mermaid';

const MermaidRoadmap = () => {
  const { state } = useLocation(); // Get the state passed from ReportUpload
  const { mermaidSyntax } = state;

  React.useEffect(() => {
    // Initialize Mermaid and render the flowchart
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
      <h2>Career Roadmap</h2>
      <div className="mermaid">
        {mermaidSyntax} {/* Render the Mermaid flowchart */}
      </div>
    </div>
  );
};

export default MermaidRoadmap;
