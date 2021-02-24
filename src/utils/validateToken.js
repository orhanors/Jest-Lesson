const { verifyJWT } = require("./jwt");
const ApiError = require("./ApiError");
const UserModel = require("../services/users/schema");
const validateToken = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");

		const decoded = await verifyJWT(token);
		const user = await UserModel.findOne({
			_id: decoded._id,
		});

		if (!user) {
			throw new ApiError(401, "Unauthorized");
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		next(new ApiError(401, "Unauthorized"));
	}
};

module.exports = { validateToken };
