const express = require('express');

const bodyParser = require('body-parser');
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");

const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3002' })); // Allow requests from http://localhost:3002
app.use(bodyParser.urlencoded({ extended: true }));


// Logger
const logger = createLogger({
  transports: [
    new LokiTransport({
      host: "http://loki:3100",
      // Only for development purposes
      interval: 5,
      labels: {
        job: 'billingcycle'
      }
    })
  ]
})

app.post('/calculate', (req, res) => {
  const cycleDay = parseInt(req.body.billCycleDate);
  const currentDate = new Date(req.body.currentDate);

  const result = calculateBillCycleRange(cycleDay, currentDate);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Web Form Microservice listening at http://localhost:${port}`);
});

function calculateBillCycleRange(cycleDay, currentDate) {
  // Log important info
  logger.info(`Calculating bill cycle range for cycle day ${cycleDay} and current date ${currentDate}`);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let startYear, startMonth, startDay, endYear, endMonth, endDay;

  if (currentDay >= cycleDay) {
    logger.info(`currentDay >= cycleDay`);

    startYear = currentYear;
    startMonth = currentMonth;
    startDay = cycleDay;
    endYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    endMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    endDay = cycleDay === 1 ? 1 : cycleDay - 1;
  } else {
    logger.info(`currentDay < cycleDay`);
    startYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    startMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    startDay = cycleDay;
    endYear = currentYear;
    endMonth = currentMonth;
    endDay = cycleDay === 1 ? 1 : cycleDay - 1;
  }

  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay, 23, 59, 59);
  logger.info(`startDate: ${startDate}, endDate: ${endDate}`);
  
  return {
    startDate,
    endDate,
  };
}
