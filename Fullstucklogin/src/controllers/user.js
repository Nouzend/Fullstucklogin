const connection = require("../services/databast");
const bcrypt = require("bcrypt");
const editMyProfileById = async (req, res) => {
  const id = req.user.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  await connection.query(
    "UPDATE `users` SET `first_name` = ?, `last_name` = ? WHERE (`id` = ?);",
    [firstName, lastName, id]
  );
  res.status(200).send({ message: "Your profile has been updated." });
};

const editMyPasswordById = async (req, res) => {
  const id = req.user.id;
  const password = req.body.password;
  const hashPwd = await bcrypt.hash(password, 10);
  await connection.query(
    "UPDATE `users` SET `password` = ? WHERE (`id` = ?);",
    [hashPwd, id]
  );
  res.status(200).send({ message: "Your password has been updated." });
};

const getMyProfile = async (req, res) => {
  const id = req.user.id;
  const [users] = await connection.query("SELECT * FROM users where id = ?", [
    id,
  ]);
  res.status(200).send(users);
};

module.exports = {
  editMyProfileById,
  editMyPasswordById,
  getMyProfile,
};
