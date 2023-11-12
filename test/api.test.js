// test/api.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); // Assuming your Express app is in app.js

chai.use(chaiHttp);
const expect = chai.expect;

const server = app.listen();

describe('Ghost Blog Engine APIs', () => {
  // Test for the '/' route
  describe('GET /', () => {
    it('should return "Hello, World!"', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Hello Welcome to Ghost Blogs!');
          done();
        });
    });
  });

  // Test for the '/blogs' route (Get All Blogs)
  describe('GET /blogs', () => {
    it('should get all blogs', (done) => {
      chai.request(server)
        .get('/blogs')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Test for the '/blogs/last-week' route (Get Last Week's Blogs)
  describe('GET /blogs/lastweek', () => {
    it('should get blogs published in the last week', (done) => {
      chai.request(server)
        .get('/blogs/lastweek')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Assuming there is a blog with ID 1 in your data
  const existingBlogId = 1;

  // Test for the '/blogs/:id' route (Get Single Blog)
  describe(`GET /blogs/${existingBlogId}`, () => {
    it('should get details of a single blog', (done) => {
      chai.request(server)
        .get(`/blogs/${existingBlogId}`)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          // Add more assertions based on your blog structure
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('content');
          done();
        });
    });
  });

  // Test for the '/create-post' route
  describe('POST /blogs/create', () => {
    it('should create a new blog post', (done) => {
      chai.request(server)
        .post('/blogs/create')
        .send({
          title: 'Test Post',
          content: 'This is a test post content.'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Blog post created successfully');
          expect(res.body.blog).to.have.property('title', 'Test Post');
          expect(res.body.blog).to.have.property('content', 'This is a test post content.');
          done();
        });
    });
  });

  // Add more tests for other routes
});
