const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000; // Change this to your desired port number

// Middleware to parse JSON requests
app.use(express.json());

// Function to load blogData from data.json
function loadData() {
    const filePath = path.join(__dirname, 'data.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading data:', error);
        return { blogs: [] }; // Return an empty array if the file doesn't exist or there's an error
    }
}

const blogData = loadData();

// Sample route
app.get('/', (req, res) => {
    res.send('Hello Welcome to Ghost Blogs!');
});

// Retrieve and return all blogs
app.get('/blogs', (req, res) => {
    const allBlogs = blogData.blogs;
    if (allBlogs) {
        res.json(allBlogs);
    } else {
        res.status(404).json({ message: 'Blog not posted recently' });
    }
});

// Retrieve and return all lastweek blogs
app.get('/blogs/lastweek', (req, res) => {
    const lastWeekBlogs = blogData.blogs.filter(blog => {
        const publishedAt = new Date(blog.publishedAt);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return publishedAt >= oneWeekAgo;
    });

    if (lastWeekBlogs) {
        res.json(lastWeekBlogs);
    } else {
        res.status(404).json({ message: 'Blog not posted recently' });
    }
});

// Retrieve and return by Id or title of the blog
app.get('/blogs/:idOrTitle', (req, res) => {
    const { idOrTitle } = req.params;
    const blog = blogData.blogs.find(blog => blog.id.toString() === idOrTitle || blog.title.toLowerCase() === idOrTitle.toLowerCase());

    if (blog) {
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
});

// Retrieve and return by Id or title of the blog
app.post('/blogs/create', (req, res) => {

    const { title, content } = req.body;

    const blogs = blogData.blogs;

    let newBlog = {};
    newBlog.id = blogs.length + 1;
    newBlog.title = title;
    newBlog.content = content;
    newBlog.publishedAt = new Date().toISOString().split('T')[0];

    blogs.push(newBlog);
    saveData(blogData);

    res.json({ message: 'Blog post created successfully', blog: newBlog });
});

// Function to save blogData to data.json
function saveData(data) {
    const filePath = path.join(__dirname, 'data.json');
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
