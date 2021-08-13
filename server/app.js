/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// const fetchData = require('./fetch-data');


const port = process.env.NODEJS_PORT;
const app = express();
const pwd = __dirname.split(path.sep);
pwd.pop();
const statics = `${pwd.join(path.sep)}/build/static`;
const assets = `${pwd.join(path.sep)}/build/assets`;

app.use('/static', express.static(statics));
app.use('/assets', express.static(assets));

const hbs = exphbs.create({
  helpers: {
    escapeJS: ( data ) => {
      return JSON.stringify( data );
    }
  },
  extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.enable('view cache');
app.locals.layout = false;

const commonIndex = (req, res) => {
  return res.render('index', {
    seo: {
      title: 'Nedii',
      og_title: 'Nedii',
      og_description: 'Nedii',
      img_og_picture: '/assets/seo.jpg',
      og_site_name: 'Nedii',
      url: '/',
      keywords: 'Nedii,expo,stands,negocios'
    }
  });
};

app.get('/', commonIndex);
app.get('/changelog', commonIndex);
app.get('/about', commonIndex);
app.get('/create-account', commonIndex);
app.get('/login', commonIndex);
app.get('/my-account', commonIndex);
app.get('/activate/:token', commonIndex);
app.get('/expos', commonIndex);
app.get('/expos/:expoId', commonIndex);
app.get('/expos/:expoId/:groupId', commonIndex);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
