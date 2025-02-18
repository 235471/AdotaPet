import 'reflect-metadata';
import app from './src/app.js';

const PORTA = Number(process.env.PORT) | 3000;

app.listen(PORTA, () => {
  console.log(`Servidor executando em http://localhost:${PORTA}`);
});
