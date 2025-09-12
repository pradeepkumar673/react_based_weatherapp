const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const correctEmail = 'pradeepkumar24wr@gmail.com';
const correctPassword = 'PASSWORD';

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === correctEmail && password === correctPassword) {
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Wrong Password man, try again' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});