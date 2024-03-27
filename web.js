const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            background-color: white;
            color: black;
          }
          .center {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
        </style>
      </head>
      <body>
        <div class="center">
          <form action="http://localhost:3001/calculate" method="post">
            <label for="billCycleDate">Enter your bill cycle date (e.g., 28):</label><br>
            <input type="number" id="billCycleDate" name="billCycleDate" min="1" max="31" required><br><br>
            <input type="date" id="currentDate" name="currentDate" required><br><br>
            <button type="submit">Calculate</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Web Form Microservice listening at http://localhost:${port}`);
});
