const connection = require("../services/databast");
const bcrypt = require("bcrypt");
const { ADMIN_ROLE } = require("../config/constants");

const registerAdmin = async (req, res) => {
  const Email = req.body.Email;
  const password = req.body.password;


  const [users] = await connection.query(
    "SELECT * FROM test.Customer WHERE Email = ?",
    [username]
  );

  if (users.length > 0) {
    return res.status(400).send({ message: "Username is already taken." });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  await connection.query(
    "INSERT INTO test (Email, Password, role) VALUES (?, ?, ?)",
    [Email, hashedPwd, ADMIN_ROLE]
  );
  res.status(200).send("Register successful.");
};

const getAllUsers = async (req, res) => {
  const [users] = await connection.query("SELECT * FROM test.Customer;");
  res.status(200).send(users);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const [users] = await connection.query("SELECT * FROM test.Customer where id = ?", [
    id,
  ]);

  if (users.length === 0) {
    return res.status(404).send({ message: "User not found." });
  }

  res.status(200).send(users[0]);
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const [users] = await connection.query("SELECT * FROM test.Customer where id = ?", [
    id,
  ]);

  if (users.length === 0) {
    return res.status(404).send({ message: "User not found." });
  }

  await connection.query(
    "UPDATE `users` SET `first_name` = ?, `last_name` = ? WHERE (`id` = ?);",
    [firstName, lastName, id]
  );

  res.status(200).send({ message: "User has been updated." });
};

module.exports = {
  registerAdmin,
  getAllUsers,
  getUserById,
  updateUserById,
};
