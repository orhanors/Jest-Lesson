const server = require("../src/server");
const { verifyJWT } = require("../src/utils/jwt");
const request = require("supertest")(server);

exports.getCatsRouteTest = () =>
	describe("Protected cats route test", () => {
		let token;
		beforeEach((done) => {
			const validCredentials = {
				username: "orhanors",
				password: "123456",
			};

			request
				.post("/users/login")
				.send(validCredentials)
				.end((err, response) => {
					if (err) return done(err);
					token = response.body.token;
					done();
				});
		});
		it("✋should be return 200 status if user is authenticated", (done) => {
			request
				.get("/cats")
				.set({ Authorization: `Bearer ${token}` })
				.end((err, response) => {
					if (err) return done(err);
					expect(response.status).toBe(200);
					done();
				});
		});

		it("✋should be return 401 status if user is NOT authenticated", async () => {
			const response = await request.get("/cats"); //without token

			expect(response.status).toBe(401);
		});
	});
