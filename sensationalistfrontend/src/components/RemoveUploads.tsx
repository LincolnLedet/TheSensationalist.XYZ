import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import './RemoveUploads.css';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // Backend URL in development
    : ''; // In production, requests default to the same origin

const RemoveUploads: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [articles, setArticles] = useState<any[]>([]);
  const [merch, setMerch] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'articles' | 'merch'>('articles');

  if (!authContext) throw new Error('AuthContext must be used within an AuthProvider');
  const { auth } = authContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesResponse, merchResponse] = await Promise.all([
          axios.get(`${baseURL}/api/articles`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
          axios.get(`${baseURL}/api/merch`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          }),
        ]);

        setArticles(articlesResponse.data);
        setMerch(merchResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [auth.token]);

  const deleteItem = async (id: number, type: 'articles' | 'merch') => {
    try {
      await axios.delete(`${baseURL}/api/${type}/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      if (type === 'articles') {
        setArticles(prev => prev.filter(item => item.id !== id));
      } else {
        setMerch(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${type === 'articles' ? 'article' : 'merch'}:`, error);
    }
  };

  return (
    <div className="remove-uploads-container">
      <h2>Manage Uploads</h2>
      <div className="tabs">
        <button className={`tab ${activeTab === 'articles' ? 'active' : ''}`} onClick={() => setActiveTab('articles')}>
          Articles
        </button>
        <button className={`tab ${activeTab === 'merch' ? 'active' : ''}`} onClick={() => setActiveTab('merch')}>
          Merch
        </button>
      </div>

      {activeTab === 'articles' ? (
        <>
          <h3>Remove Uploaded Articles</h3>
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            <ul className="upload-list">
              {articles.map(article => (
                <li key={article.id}>
                  <span className="upload-title">{article.title}</span>
                  <button className="delete-button" onClick={() => deleteItem(article.id, 'articles')}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <h3>Remove Merch Items</h3>
          {merch.length === 0 ? (
            <p>No merch items found.</p>
          ) : (
            <ul className="upload-list">
              {merch.map(item => (
                <li key={item.id}>
                  <span className="upload-title">{item.title} - ${item.price}</span>
                  <button className="delete-button" onClick={() => deleteItem(item.id, 'merch')}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default RemoveUploads;
