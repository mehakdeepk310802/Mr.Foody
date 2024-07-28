import express from 'express';
import mongoDB from './db.js';
import userRoutes from './Routes/CreatUser.js';
import displayData from './Routes/DisplayData.js';
import orderData from './Routes/OrderData.js';
import cors from 'cors';

const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB();

// Middleware to enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', displayData);
app.use('/api', orderData);
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
