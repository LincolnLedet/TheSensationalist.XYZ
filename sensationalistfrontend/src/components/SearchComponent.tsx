import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchComponent.css';

// Define the structure of an article
interface Issue {
  id: number;
  title: string;
  description: string;
  pdfPath: string;
  coverImage: string;
  filetype: string;
  viewcount: number;
}

const IssueModule: React.FC = () => {
  const [articles, setArticles] = useState<Issue[]>([]);
  const [filter, setFilter] = useState<string>(''); // State for the filter input

  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  const handleArticleClick = async (articleId: number) => {
    try {
      await axios.post(`http://localhost:5000/api/articles/${articleId}/increment-viewcount`);
      console.log(`View count incremented for article ID: ${articleId}`);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }

  // Function to handle filter input change
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  // Filter articles based on the filter state
  //creates an array of filtered articles
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(filter.toLowerCase()) ||
    article.description.toLowerCase().includes(filter.toLowerCase())
    // Add more fields to filter by here
  );

  const [checkedIssue, setCheckedIssue] = useState(true);
  const handleIssueCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedIssue(event.target.checked);
  }

  const [checkedVolume, setCheckedVolume] = useState(true);
  const handleVolumeCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedVolume(event.target.checked);
  }

  return (
    <div className="search">
      
      <div className="search-header">
        <h1>Issues</h1>
        <div className="checkbox-section">
          <label className="search-label">Search by type:</label>
          <div className="checkbox-type">
            <label className="checkbox-label">Issue</label>
            <input 
              type="checkbox" 
              checked={checkedIssue}
              onChange={handleIssueCheckboxChange}
              className="checkbox-box"
              />
          </div>
          <div className="checkbox-type">
            <label className="checkbox-label">Volume</label>
            <input 
              type="checkbox" 
              checked={checkedVolume}
              onChange={handleVolumeCheckboxChange}
              className="checkbox-box"
            />
          </div>  
        </div>
      </div>

      {/* Filter Form */}
      <form className="filter-form">
        <span className="search-icon">search</span>
        <input
            type="text"
            placeholder="Filter articles by title or description"
            value={filter}
            onChange={handleFilterChange}
            className="filter-input"
        />
        <label className="filter-checkbox">
            <input
            type="checkbox"
            //checked={isChecked}
            //onChange={handleCheckboxChange}
            />
            Show only popular articles
        </label>
        <label className="filter-checkbox">
            <input
            type="checkbox"
            //checked={isChecked}
            //onChange={handleCheckboxChange}
            />
            Show only popular articles
        </label>
        </form>

      <ul className="article-list">
        {filteredArticles
          .filter(article => {
            if (checkedIssue && article.filetype === 'Issue') return true;
            if (checkedVolume && article.filetype === 'Volume') return true;
            return false;
          })
            /*(article.filetype === 'Issue' || article.filetype === 'Volume'))*/
          .map(article => (
            <li key={article.id} className="article-item">
              <a
                href={`/articles/${article.id}`}
                className="article-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleArticleClick(article.id).then(() => {
                    window.location.href = `/articles/${article.id}`;
                  });
                }}
              >
                <h2 className="article-title">{article.title}</h2>
                <div className="article-content-preview">
                  <img
                    src={`http://localhost:5000/${article.coverImage.replace(/\\/g, '/')}`}
                    alt={article.title}
                    className="article-image"
                  />
                  <div className="article-details">
                    <p className="article-description">{article.description}</p>
                    <p className="article-viewcount">Views: {article.viewcount || 0}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
      
    </div>
   
  );
};

export default IssueModule;
