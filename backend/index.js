const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); 
app.use(bodyParser.json()); 

const db = mysql.createPool('mysql://root:NZfXKKFcrKpZhWpZPwnblaruvrxTbOnC@autorack.proxy.rlwy.net:21903/railway');

(async () => {
  try {
    const connection = await db.promise().getConnection(); 
    console.log('Connected to the database successfully.');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
})();


app.post('/api/employees', async (req, res) => {
  const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;


  if (!name || !employeeId || !email || !phoneNumber || !department || !dateOfJoining || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `
    INSERT INTO employees (name, employeeId, email, phoneNumber, department, dateOfJoining, role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.promise().query(sql, [
      name,
      employeeId,
      email,
      phoneNumber,
      department,
      dateOfJoining,
      role,
    ]);
    res.status(200).json({ message: 'Employee data inserted successfully.', result });
  } catch (err) {
    console.error('Error inserting data:', err.message);
    res.status(500).json({ error: 'Failed to insert data into the database.' });
  }
});


app.get('/api/employees', async (req, res) => {
  const sql = 'SELECT * FROM employees';

  try {
    const [rows] = await db.promise().query(sql);
    res.status(200).json({ employees: rows });
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ error: 'Failed to fetch employee data from the database.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

