import express from 'express';
import notionRoutes from './routes/notionRoutes';

const app = express();
app.use(express.json());

app.use('/api', notionRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
