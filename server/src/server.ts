import 'dotenv/config';
import './jobs/expiredGroup'
import './env';
import app from './app';
import '@database';

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT || 3001}`);
});
