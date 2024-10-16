import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of an article
interface Article {
  id: number;
  title: string;
  description: string;
  pdfPath: string;
}

const PDFtest: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.pdfPath}</h2>
            <p>{article.description}</p>
            {/* URL-encode the PDF path */}
            {article.pdfPath && (
              <iframe
                className="PFD-container"
                src={`http://localhost:5000/${article.pdfPath.replace(/\\/g, '/')}`}
                width="600px"
                height="500px"
                title="PDF Viewer"
              ></iframe>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PDFtest;