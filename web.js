const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
// Rest of your server-side code...

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
          div{

            margin-top: 10px;
            margin-left:10px;
            margin-right:10px;
            
            }
          
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
      </head>
      <body>
        <div class="center">
          <form id="calculateForm" action="http://localhost:3001/calculate" method="post">
            <label for="billCycleDate">Enter your bill cycle date (e.g., 28):</label><br>
            <input type="number" id="billCycleDate" name="billCycleDate" min="1" max="31" required><br><br>
            <input type="date" id="currentDate" name="currentDate" required><br><br>
            <button type="submit">Calculate</button>
          </form>
          <div id="startDateContainer">
            <label for="startDate">Start Date : </label>
            <span id="startDate"></span>
          </div>
          <div id="endDateContainer">
            <label for="endDate">End Date : </label>
            <span id="endDate"></span>
          </div>
        </div>
      </body>
      <script>
        $(document).ready(function() {
          $('#calculateForm').submit(function(event) {
            event.preventDefault(); // Prevent default form submission

            // Prepare AJAX request
            $.ajax({
              url: $(this).attr('action'), // Get action URL from form
              type: 'POST',
              data: $(this).serialize(), // Serialize form data
              success: function(response) {
                // Log response data to console
                console.log("Response:", response);
                $('#startDate').html(response.startDate);
                $('#endDate').html(response.endDate);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                // Log error details to console
                console.error("AJAX Error:", textStatus, errorThrown);
                // Display error message in 'output' element
                $('#output').html("Error: " + textStatus);
              }
            });
          });
        });
      </script>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Web Form Microservice listening at http://localhost:${port}`);
});
