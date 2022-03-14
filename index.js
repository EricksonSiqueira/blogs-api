const express = require('express');

const app = express();

const userRoute = require('./routes/user.routes');

app.use(express.json());

app.use('/user', userRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
