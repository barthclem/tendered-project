import { createServer } from "http";
import { app } from "./app";
import { sequelize, initDb } from "./database/sequelize";

const port = process.env.PORT || 5000;

(async () => {
	await sequelize.sync({ force: true });
	initDb();

	createServer(app).listen(port, () =>
		console.log(`Server listen on port ${port}`)
	);
})();
