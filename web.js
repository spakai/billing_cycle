const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="http://localhost:3001/calculate" method="post">
      <label for="billCycleDate">Enter your bill cycle date (e.g., 28):</label><br>
      <input type="number" id="billCycleDate" name="billCycleDate" min="1" max="31" required><br><br>
      <button type="submit">Calculate</button>
    </form>
  `);
});

app.listen(port, () => {
  console.log(`Web Form Microservice listening at http://localhost:${port}`);
});

