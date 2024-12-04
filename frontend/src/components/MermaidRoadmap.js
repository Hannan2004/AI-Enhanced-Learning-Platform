import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidRoadmap = ({ data }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  const generateMermaidDiagram = () => {
    let diagram = 'graph TD\n';
    data["Learning Plan"]["Recommended Resources"].forEach((resource, index) => {
      diagram += `  ${index}["${resource["Skill Name"]}: ${resource["Resource Name"]} (${resource["Type"]})"]\n`;
      if (index > 0) {
        diagram += `  ${index - 1} --> ${index}\n`;
      }
    });
    return diagram;
  };

  return (
    <div className="mermaid" ref={mermaidRef}>
      {generateMermaidDiagram()}
    </div>
  );
};

export default MermaidRoadmap;