const express = require("express");
const app = express();
const { SEVER_PORT } = require("./src/config/constants");
const authRoutes = require("./src/router/auth");
const adminRoutes = require("./src/router/admin");
const usersRoutes = require("./src/router/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);

app.listen(SEVER_PORT, () => {
  console.log(`App is running at port ${SEVER_PORT}.`);
});