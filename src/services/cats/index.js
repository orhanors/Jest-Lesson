const { default: axios } = require("axios");
const { validateToken } = require("../../utils/validateToken");

const catsRouter = require("express").Router();

catsRouter.get("/", validateToken, async (req, res, next) => {
	try {
		const response = axios.get("https://cataas.com/cat?json=true");

		const data = response.data;
		res.status(200).send({ data });
	} catch (error) {
		next(error);
	}
});

module.exports = catsRouter;
