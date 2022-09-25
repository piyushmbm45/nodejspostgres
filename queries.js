const Pool = require('pg').Pool;
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const events = require('events');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

let eventForRequest = new events.EventEmitter();

eventForRequest.on('RequestInfo', (data) => {
  console.table(data);
});

function getCurrentTime() {
  const newDate = new Date();
  const datetime = newDate.toLocaleString();
  return datetime;
}

const collectError = (error) => {
  throw error;
};

const getUsers = (request, response) => {
  const data = {
    requestType: 'get',
    requestRoute: '/api/getusers',
    time: getCurrentTime(),
  };
  eventForRequest.emit('RequestInfo', data);
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const data = {
    requestType: 'get',
    requestRoute: '/api/getuser/:id',
    time: getCurrentTime(),
  };
  eventForRequest.emit('RequestInfo', data);
  const id = request.params.id;
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    if (error) collectError(error);
    response.status(200).json(result.rows);
  });
};

const createUser = (req, res) => {
  const data = {
    requestType: 'post',
    requestRoute: '/api/createuser',
    time: getCurrentTime(),
  };
  eventForRequest.emit('RequestInfo', data);
  const { name, email, dob, password } = req.body;
  if (!(name && email && dob && password)) {
    throw new Error('Required');
  }
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) collectError(err);
    const id = uuidv4();
    pool.query(
      'INSERT INTO users (id, name, email, dob, password) VALUES ($1, $2, $3, $4, $5)',
      [id, name, email, dob, hash],
      (error, result) => {
        if (error) collectError(error);
        res.status(201).send('User ' + result.rowCount + 'inserted');
      }
    );
  });
};

const updateUser = (req, res) => {
  const data = {
    requestType: 'post',
    requestRoute: '/api/updateuser/:id',
    time: getCurrentTime(),
  };
  eventForRequest.emit('RequestInfo', data);
  const id = req.params.id;
  const { name, email } = req.body;
  if (!(name && email)) throw new Error('Name and Email Required');
  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (req, res) => {
  const data = {
    requestType: 'get',
    requestRoute: '/api/deleteuser/:id',
    time: getCurrentTime(),
  };
  eventForRequest.emit('RequestInfo', data);
  const id = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    res.status(200).send(`User Delete With Id ${id}`);
  });
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
