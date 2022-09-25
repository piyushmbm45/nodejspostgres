const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('./queries');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get('/getusers', getUsers);

router.get('/getuser/:id', getUserById);

router.post('/createuser', createUser);

router.post('/updateuser/:id', updateUser);

router.post('/deleteuser/:id', deleteUser);

module.exports = router;
