const { registerTest, loginTest } = require("./auth");
const { getCatsRouteTest } = require("./protected");
const mongoose = require("mongoose");
beforeAll((done) => {
	mongoose.connect(
		process.env.ATLAS_TEST_URL,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => {
			console.log("Successfully connected to Atlas.");
			done();
		}
	);
});

afterAll((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
		console.log("DB is closing");
	});
});
describe("Sequential test", () => {
	registerTest();
	loginTest();

	getCatsRouteTest();
});
