import express from 'express';
import bodyParser from 'body-parser';

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

app.get('/', (req, res) => {
  res.render('home.ejs', { content: homeStartingContent });
});

// app.post('/create', (req, res) => {
//   res.render();
// });

// app.put('/edit', (req, res) => {
//   res.render();
// });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
