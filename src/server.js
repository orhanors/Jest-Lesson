require("dotenv").config();
const {
	badRequestHandler,
	notFoundHandler,
	genericErrorHandler,
	forbiddenError,
	unauthorizedError,
} = require("./utils/errorHandling");
const express = require("express");
const server = new express();

const userRouter = require("./services/users");
const catsRouter = require("./services/cats");

server.use(express.json());

server.get("/test", (req, res) => {
	res.status(200).send({ message: "Test success" });
});

server.use("/users", userRouter);
server.use("/cats", catsRouter);

server.use(badRequestHandler);
server.use(forbiddenError);
server.use(notFoundHandler);
server.use(unauthorizedError);
server.use(genericErrorHandler);
module.exports = server;
