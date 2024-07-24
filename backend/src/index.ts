import express from 'express';
import { startGrpcServer } from './config/grpcServer';
import userRoutes from './routes/userRoutes'
import { authenticateJWT } from './middlewares/authMiddleware';

startGrpcServer();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({message: 'Protected route'});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
