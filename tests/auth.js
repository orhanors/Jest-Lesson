const server = require("../src/server");
const request = require("supertest")(server);

const UserSchema = require("../src/services/users/schema");
const { verifyJWT } = require("../src/utils/jwt");
const UserModel = require("mongoose").model("User", UserSchema);

exports.registerTest = () =>
	describe("Register test", () => {
		afterEach(() => {});
		const validCredentials = {
			username: "orhanors",
			password: "123456",
		};

		const invalidCredentials = {
			username: "orhanors",
		};

		const incorrectCredentials = {
			username: "orhanors",
			password: "incorrectPassword",
		};

		const validToken = "VALID_TOKEN";

		it("should return an id from a /users/register endpoint when provided with valid credentials", async () => {
			const response = await request
				.post("/users/register")
				.send(validCredentials);

			const { _id } = response.body;
			expect(_id).not.toBeFalsy();
			expect(typeof _id).toBe("string");

			const user = await UserModel.findById(_id);

			expect(user).toBeDefined();
		});

		it("should NOT return an id from a /users/register endpoint when provided with incorrect credentials", async () => {
			const response = await request
				.post("/users/register")
				.send(invalidCredentials);

			expect(response.status).toBe(400);
		});
	});

exports.loginTest = () =>
	describe("Login test", () => {
		it("should return a valid token when user attempts to login with valid credentials", async () => {
			const validCredentials = {
				username: "orhanors",
				password: "123456",
			};

			const response = await request
				.post("/users/login")
				.send(validCredentials);

			const { token } = response.body;
			const { _id } = await verifyJWT(token);
			expect(_id).not.toBeFalsy();
			expect(typeof _id).toBe("string");
		});

		it("should NOT return a valid token when users attemps to login with invalid credentials", async () => {
			const invalidCredentials = {
				username: "orhanors",
			};
			const response = await request
				.post("/users/login")
				.send(invalidCredentials);

			expect(response.status).toBe(400);
		});
	});

// III: Testing protected endpoints
