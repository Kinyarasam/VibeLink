import express from 'express';
import { getGrpcClient } from './config/grpcClient';
import * as grpc from '@grpc/grpc-js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const client = getGrpcClient();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/helloworld', (req, res) => {
  const request = { name: req.query.name || 'World' };;
  client.sayHello(request, (error: grpc.ServiceError | null, response: any) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
    } else {
      res.send(`Greetings: ${response.message}`);
    }
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
