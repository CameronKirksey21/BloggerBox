import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';

const homeStartingContent =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi ipsa, soluta debitis officiis adipisci aspernatur doloremque eaque et blanditiis voluptatum vel, ad, suscipit at rerum in quaerat facilis explicabo totam!';

const aboutContent =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi ipsa, soluta debitis officiis adipisci aspernatur doloremque eaque et blanditiis voluptatum vel, ad, suscipit at rerum in quaerat facilis explicabo totam!';

const contactContent =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi ipsa, soluta debitis officiis adipisci aspernatur doloremque eaque et blanditiis voluptatum vel, ad, suscipit at rerum in quaerat facilis explicabo totam!';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get('/', (req, res) => {
  res.render('home.ejs', { content: homeStartingContent, posts: posts });
});

app.get('/about', (req, res) => {
  res.render('about.ejs', { aboutContent: aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs', { contactContent: contactContent });
});

app.get('/create', (req, res) => {
  res.render('create.ejs');
});

app.post('/create', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect('/');
});

app.get('/posts/:postName', (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render('post.ejs', {
        title: post.title,
        content: post.content,
      });
    } else {
      console.log('Not a Match');
    }
  });
});

app.post('/edit', (req, res) => {
  res.render();
});

app.delete('/delete', (req, res) => {
  const post = req.body.post;
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
