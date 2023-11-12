const express = require('express');
const blogData = require('./data.json');
const app = express();
const port = 3000; // Change this to your desired port number

// Middleware to parse JSON requests
app.use(express.json());


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
    const currentDate = new Date();

    const blogs = blogData.blogs;
    const lastPostedBlog = blogs.pop();

    // Get the publishedAt format
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    let newBlog = {};
    newBlog.id = lastPostedBlog.id + 1;
    newBlog.title = title;
    newBlog.content = content;
    newBlog.publishedAt = `${year}-${month}-${day}`;

    console.log('new blog', newBlog)
    blogs.push(newBlog);

    // if (blogs) {
    //     res.json(blog);
    // } else {
    //     res.status(404).json({ message: 'Blog not found' });
    // }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
