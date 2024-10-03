import React, { useEffect, useState } from 'react';
import { getArticleById } from '../../services/articleService';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (id) {
                    const data = await getArticleById(id);
                    setArticle(data);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            {/* Assuming pdfPath is a URL to view the PDF */}
            <iframe src={article.pdfPath} title={article.title} width="100%" height="600px"></iframe>
        </div>
    );
};

export default ArticleDetail;
