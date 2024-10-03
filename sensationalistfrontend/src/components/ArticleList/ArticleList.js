import React, { useEffect, useState } from 'react';
import { getArticles } from '../../services/articleService';
import { Link } from 'react-router-dom';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <h2>Available Articles</h2>
            <ul>
                {articles.map((article) => (
                    <li key={article._id}>
                        <Link to={`/articles/${article._id}`}>{article.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;
