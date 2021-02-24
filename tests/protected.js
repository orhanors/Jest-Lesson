const server = require("../src/server");
const request = require("supertest")(server);

exports.getCatsRouteTest = () =>
	describe("Protected cats route test", () => {
		console.log("protected test is running");
		let token;
		beforeEach(() => {
			const validCredentials = {
				username: "orhanors",
				password: "123456",
			};

			request
				.post("/users/login")
				.send(validCredentials)
				.end((err, response) => {
					token = response.body.token;
				});
		});
		it("should be return 200 status if user is authenticated", async () => {
			console.log("the token is:", token);
			const response = await request
				.get("/cats")
				.set({ Authorization: `Bearer ${token}` });

			expect(response.status).toBe(200);
			//expect(response.type).toBe("application/json");
		});
	});
