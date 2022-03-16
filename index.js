const express = require('express');

const app = express();

const userRoute = require('./routes/user.routes');
const categorieRoute = require('./routes/categorie.routes');
const postRoute = require('./routes/post.routes');

const loginController = require('./controllers/loginController');
const validation = require('./middlewares/loginValidations');

app.use(express.json());

app.use('/user', userRoute);

app.post('/login',
  validation.isEmailValid,
  validation.isPasswordValid,
  loginController.post);

app.use('/categories', categorieRoute);

app.use('/post', postRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
