/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
// const fetchData = require('./fetch-data');

const port = 3000;
const app = express();

app.use('/static', express.static('/static'));
app.use('/assets', express.static('/assets'));

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

app.get('/terminos-y-condiciones', commonIndex);
app.get('/politica-de-privacidad', commonIndex);
app.get('/uso-de-datos-de-usuario', commonIndex);
app.get('/changelog', commonIndex);
app.get('/about', commonIndex);
app.get('/create-account', commonIndex);
app.get('/login', commonIndex);
app.get('/my-account', commonIndex);
app.get('/activate/:token', commonIndex);
app.get('/expos', commonIndex);
app.get('/expos/:expoId', commonIndex);
app.get('/expos/:expoId/:groupId', commonIndex);
app.get('/empresa/:standId', commonIndex);
app.get('/empresa/:standId/menu', commonIndex);
app.get('/empresa/:standId/productos', commonIndex);
app.get('/empresa/:standId/producto/:productId', commonIndex);
app.get('/empresa/:standId/news/:standNewsId', commonIndex);
app.get('/empresa/:standId/menu/:mealId', commonIndex);
app.get('/empresa/:standId/servicios', commonIndex);
app.get('/empresa/:standId/servicio/:serviceId', commonIndex);
app.get('/empresa/:standId/vehiculos', commonIndex);
app.get('/empresa/:standId/vehiculo/:vehicleId', commonIndex);
app.get('/empresa/:standId/inmuebles', commonIndex);
app.get('/empresa/:standId/inmueble/:realEstateId', commonIndex);
app.get('/', commonIndex);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
