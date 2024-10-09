import React, { useState } from 'react';
import { createArticle } from '../../services/articleService';
import { useNavigate } from 'react-router-dom';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pdf, setPdf] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Use FormData to handle file upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('pdf', pdf);  // Add the file to the form data

        try {
            await createArticle(formData);
            navigate('/articles');  // Redirect to articles list on success
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div>
            <h2>Create New Article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Upload PDF:</label>
                    <input
                        type="file"
                        onChange={(e) => setPdf(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default ArticleForm;
