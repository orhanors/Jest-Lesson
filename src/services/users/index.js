const router = require("express").Router();
const ApiError = require("../../utils/ApiError");
const UserSchema = require("./schema");
const UserModel = require("mongoose").model("User", UserSchema);
const { generateJWT } = require("../../utils/jwt");

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) throw new Error("Provide credentials");

		const user = new UserModel({ username, password });
		const { _id } = await user.save();

		res.status(201).send({ _id });
	} catch (error) {
		res.status(400).send({
			message: error.message,
			errorCode: "wrong_credentials",
		});
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		if (!username || !password)
			throw new ApiError(400, "Invalid Credentials");

		const user = await UserModel.findOne({ username });

		if (user.password !== password)
			throw new ApiError(400, "Invalid Credentials");

		const token = await generateJWT({ _id: user._id });
		return res.status(200).send({ token });
	} catch (error) {
		console.log("test");
		next(error);
	}
});

module.exports = router;
