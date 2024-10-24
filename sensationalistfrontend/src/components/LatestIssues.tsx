import React from 'react';
import './LatestIssues.css'; // Import the CSS file for the Thrasher style
import IssueModule from './IssueModule';
 // Import SVG as a React component

const LatestIssues: React.FC = () => {
  return (
    <div className="LatestIssues">
        <div className="LatestIssuesHeader">
        </div>
        <IssueModule/>
    </div>
  );
};

export default LatestIssues;

