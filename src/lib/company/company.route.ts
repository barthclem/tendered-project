import { NextFunction, Router, Response, Request } from "express";
import { Company } from "./Company";
import { User } from "../users/User";
import { Request as Task} from "../request/Request";

import {
	ApiOperationGet,
	ApiOperationPost,
	ApiPath,
	SwaggerDefinitionConstant,
} from "swagger-express-typescript";


@ApiPath({
	name: "Companiees",
	path: "/companies",
})
export class CompanyRoutes {
	router: Router;

	constructor() {
		this.router = Router();
		this.setupRoutes();
	}

	public getRoute(): Router {
		return this.router;
	}

	setupRoutes() {
		this.router.post("/companies", this.createCompany);
		this.router.get("/companies", this.getAllCompanies);
		this.router.get("/companies/:id", this.getCompany);
		this.router.get("/companies/:id/users", this.getCompanyUsers);
		this.router.get("/companies/:id/requests", this.getCompanyRequests);
	}

	@ApiOperationPost({
		description: "Post company object",
		parameters: {
			body: {
				description: "New Company",
				model: "Company",
				required: true,
			},
		},
		responses: {
			200: {
				model: "Company",
			},
			400: { description: "Parameters fail" },
		},
		summary: "Post new companty",
	})
	private createCompany(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const company = request.body;
		Company.create(company)
			.then((company) => response.json(company))
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get companies objects list",
		responses: {
			200: {
				model: "Company",
				type: SwaggerDefinitionConstant.Response.Type.ARRAY,
			},
		},
		summary: "Get companies list",
	})
	private getAllCompanies(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		return Company.findAll()
			.then((companies) => response.json(companies))
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get a company",
		path: "/{id}",
		parameters: {
			path: {
				id: {
					description: "Id of Company",
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
					required: true,
				},
			},
		},
		responses: {
			200: {
				model: "Company",
			},
			404: {
				description: "Company with given id is not found",
			},
		},
		summary: "Get companies list",
	})
	private getCompany(request: Request, response: Response, next: NextFunction) {
		const companyId: string = request.params.id;
		Company.findByPk(companyId)
			.then((company) =>
				company ? response.json(company) : next({ statusCode: 404 })
			)
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get a company including the list of its users",
		path: "/{id}",
		parameters: {
			path: {
				id: {
					description: "Id of Company",
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
					required: true,
				},
			},
		},
		responses: {
			200: {
				model: "Company",
			},
			404: {
				description: "Company with given id is not found",
			},
		},
		summary: "Get companies list",
	})
	private getCompanyUsers(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const companyId: string = request.params.id;
		Company.findByPk(companyId, { include: [User] })
			.then((company) =>
				company ? response.json(company) : next({ statusCode: 404 })
			)
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get a company including the list of its requests",
		path: "/{id}",
		parameters: {
			path: {
				id: {
					description: "Id of Company",
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
					required: true,
				},
			},
		},
		responses: {
			200: {
				model: "Company",
			},
			404: {
				description: "Company with given id is not found",
			},
		},
		summary: "Get companies list",
	})
	private getCompanyRequests(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const companyId: string = request.params.id;
		Company.findByPk(companyId, { include: [Task] })
			.then((company) =>
				company ? response.json(company) : next({ statusCode: 404 })
			)
			.catch(next);
	}
}