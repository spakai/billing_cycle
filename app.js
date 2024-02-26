const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate', (req, res) => {
  const billCycleDate = parseInt(req.body.billCycleDate);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const startDate = new Date(currentYear, currentMonth - 1, billCycleDate);
  let endDate;
  if (currentMonth === 12) {
    endDate = new Date(currentYear + 1, 0, billCycleDate);
  } else {
    endDate = new Date(currentYear, currentMonth, billCycleDate);
  }

  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate);

  res.send(`Your bill cycle range for the current month is: ${startDateFormatted} to ${endDateFormatted}`);
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day} ${getMonthName(month)} ${year}`;
}

function getMonthName(month) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[parseInt(month, 10) - 1];
}

app.listen(port, () => {
  console.log(`Calculation Microservice listening at http://localhost:${port}`);
});
