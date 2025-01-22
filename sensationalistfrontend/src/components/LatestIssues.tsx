import React from 'react';
import './LatestIssues.css'; // Import the CSS file for the Thrasher style
import IssueModule from './IssueModule';
 // Import SVG as a React component


const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // Backend URL in development
    : ''; // In production, requests default to the same origin
    
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

