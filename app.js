const express = require('express');
const blogData = require('./data.json');
const app = express();
const port = 3000; // Change this to your desired port number

// Middleware to parse JSON requests
app.use(express.json());


// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Retrieve and return all blogs
app.get('/blogs', (req, res) => {
    res.json(blogData.blogs);
});

// Retrieve and return all lastweek blogs
app.get('/blogs/lastweek', (req, res) => {  
    console.log('avav')
    const lastWeekBlogs = blogData.blogs.filter(blog => {
        const publishedAt = new Date(blog.publishedAt);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return publishedAt >= oneWeekAgo;
    });

    res.json(lastWeekBlogs);
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


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
