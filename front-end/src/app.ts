import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

app.get('/datatable', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src/views/datatable.html'));
});

app.listen(PORT, () => {
    console.log(`Client is running on http://localhost:${PORT}`);
});
