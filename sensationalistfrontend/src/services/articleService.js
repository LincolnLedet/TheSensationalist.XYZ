import axios from 'axios';

const API_URL = '/api/articles';

// Fetch all articles
export const getArticles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Fetch an article by ID
export const getArticleById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Create a new article
export const createArticle = async (articleData) => {
    const response = await axios.post(API_URL, articleData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Required to handle file uploads
        },
    });
    return response.data;
};
