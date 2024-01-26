import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';

const homeStartingContent =
  'Welcome to BloggerBox, your personalized gateway to personal blogging! Are you passionate about sharing your thoughts, experiences, and creativity with yourself? Look no further. BloggerBox is a tailor-made application designed for individuals who aspire to express themselves freely through the art of blogging.  our user-friendly platform provides the perfect space for you to unleash your creativity. With BloggerBox, you have the power to blog about anything that inspires you';

const aboutContent =
  'BloggerBox is an application that was built with Node.js, Express.js and EJS. HTML, CSS and Boostrap were used for styling and structure! BloggerBox is not connected to a database so no data will persist through multiple sessions';

const contactContent = 'Feel free to contact me by the following:';

let lastId = 0;

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
  const newId = (lastId += 1);
  const post = {
    id: newId,
    title: req.body.postTitle,
    content: req.body.postBody,
    author: req.body.postAuthor,
    date: new Date(),
  };

  lastId = newId;
  posts.push(post);
  res.status(201).redirect('/');
});

app.get('/posts/:id', (req, res) => {
  const requestedId = parseInt(req.params.id);

  posts.forEach((post) => {
    const storedId = post.id;

    if (storedId === requestedId) {
      res.render('post.ejs', {
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author,
        date: post.date,
      });
    } else {
      console.log('Not a Match');
    }
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
