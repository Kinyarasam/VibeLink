import express from 'express';
import { startGrpcServer } from './config/grpcServer';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import { authenticateJWT } from './middlewares/authMiddleware';
import { createConnection } from 'typeorm';

startGrpcServer();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({message: 'Protected route'});
});

createConnection()
  .then(async connection => {
    console.log("connecte to MySQL database!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => console.log(error));

