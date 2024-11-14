import app from './app.js'

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
   if (err) throw err;
   console.log(`Running at address http://localhost:${PORT}`)
})
