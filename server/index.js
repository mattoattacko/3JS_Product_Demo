import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

//bring in the dallE routes
import dalleRoutes from './routes/dalle.routes.js'; //make sure to add the .js since we are using Node

//set up environment variables
dotenv.config();

//set up express middleware
const app = express();
app.use(cors());
app.use(express.json({ limit: '250mb '})); //specify weight of payload we can send

app.use('/api/v1/dalle', dalleRoutes); //use the routes we imported from the routes folder

//demo route
app.get('/', (req, res) => {
  res.status(200).json({ message: "hello from DALL.E" });
});

//set up port (host it)
app.listen(8080, () => console.log('Server started on port 8080'))