import express from 'express';
import bodyParser from 'body-parser';

const homeStartingContent =
  'Welcome to BloggerBox, your personalized gateway to personal blogging! Are you passionate about sharing your thoughts, experiences, and creativity with yourself? Look no further. BloggerBox is a tailor-made application designed for individuals who aspire to express themselves freely through the art of blogging.  our user-friendly platform provides the perfect space for you to unleash your creativity. With BloggerBox, you have the power to blog about anything that inspires you';

const aboutContent =
  'BloggerBox is an application that was built with Node.js, Express.js and EJS. HTML, CSS and Boostrap were used for styling and structure! BloggerBox is not connected to a database so no data will persist through multiple sessions';

const app = express();
const port = 3000;

// Data Center
let posts = [];

// Post Constructor
function Post(title, content) {
  this.title = title;
  this.content = content;
  this.rawDate = new Date();
  this.date = this.rawDate.toLocaleString();
}

// Add Post
function addPost(title, content) {
  let post = new Post(title, content);
  posts.push(post);
}

// Delete Post
function deletePost(index) {
  posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
  posts[index] = new Post(title, content);
}

// Midleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Todo All paths

// Home
app.get('/', (req, res) => {
  res.render('home.ejs', { content: homeStartingContent, posts: posts });
});

app.get('/about', (req, res) => {
  res.render('about.ejs', { aboutContent: aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

// View Post
app.get('/view/:id', (req, res) => {
  let index = req.params.id;
  let post = posts[index];
  res.render('view.ejs', {
    postId: index,
    title: post.title,
    content: post.content,
  });
});

// Delete Post
app.post('/delete', (req, res) => {
  let index = req.body['postId'];
  deletePost(index);
  res.redirect('/');
});

// Edit Post Page
app.get('/edit/:id', (req, res) => {
  let index = req.params.id;
  let post = posts[index];
  res.render('create.ejs', {
    postId: index,
    title: post.title,
    content: post.content,
  });
});

// Update
app.post('/update', (req, res) => {
  let title = req.body['title'];
  let content = req.body['content'];
  let index = req.body['index'];
  editPost(index, title, content);
  res.redirect('/');
});

// Create Post Page
app.get('/create', (req, res) => {
  res.render('create.ejs');
});

// Save Post
app.post('/save', (req, res) => {
  let title = req.body['title'];
  let content = req.body['content'];

  addPost(title, content);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
