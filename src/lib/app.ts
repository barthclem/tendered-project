import * as express from "express";
import * as strongErrorHandler from "strong-error-handler";
import { json } from "body-parser";

import { UserRoute } from './users/user.route';
import { CompanyRoutes } from './company/company.route'
import { TaskRequestRoute } from "./request/request.route";
import * as swagger from "swagger-express-typescript/";

export const app = express();

app.use("/api-docs/swagger", express.static("swagger"));
app.use(
	"/api-docs/swagger/assets",
	express.static("node_modules/swagger-ui-dist")
);
app.use(json());
app.use((new UserRoute()).getRoute());
app.use((new TaskRequestRoute()).getRoute());
app.use((new CompanyRoutes()).getRoute());

app.use(
	swagger.express({
		definition: {
			externalDocs: {
				url: "My url",
			},
			info: {
				title: "My api",
				version: "1.0",
			},
			responses: {
				500: {},
			},
		},
	})
);


app.use(
	strongErrorHandler({
		debug: true,
	})
);
