import { NextFunction, Router, Response, Request } from "express";
import { Request as TaskRequest } from "../request/Request";
import { User } from "../users/User";

import {
	ApiOperationGet,
	ApiOperationPost,
	ApiPath,
	SwaggerDefinitionConstant,
} from "swagger-express-typescript";

@ApiPath({
	name: "user",
	path: "/users",
})
export class UserRoute {
	router: Router;

	constructor() {
		this.router = Router();
		this.setupRoutes();
	}

	public getRoute(): Router {
		return this.router;
	}

	setupRoutes() {
		this.router.post("/users", this.createUser);
		this.router.get("/users", this.getUsers);
		this.router.get("/users/:id", this.getUser);
		this.router.get("/users/:id/taskrequests", this.getAssignedTasks);
	}

	@ApiOperationPost({
		description: "Post a user object",
		parameters: {
			body: {
				description: "New User",
				model: "User",
				required: true,
			},
		},
		responses: {
			200: {
				model: "User",
			},
			400: { description: "Parameters fail" },
		},
		summary: "Post new user",
	})
	private createUser(request: Request, response: Response, next: NextFunction) {
		const user = request.body;
		User.create(user)
			.then((user) => response.json(user))
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get User objects list",
		responses: {
			200: {
				model: "User",
				type: SwaggerDefinitionConstant.Response.Type.ARRAY,
			},
		},
		summary: "Get users list",
	})
	private getUsers(request: Request, response: Response, next: NextFunction) {
		return User.findAll()
			.then((users) => response.json(users))
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get a user",
		path: "/{id}",
		parameters: {
			path: {
				id: {
					description: "Id of User",
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
					required: true,
				},
			},
		},
		responses: {
			200: {
				model: "User",
			},
			404: {
				description: "User with given id is not found",
			},
		},
		summary: "Get requestTasks list",
	})
	private getUser(request: Request, response: Response, next: NextFunction) {
		const userId: string = request.params.id;
		User.findByPk(userId)
			.then((user) => (user ? response.json(user) : next({ statusCode: 404 })))
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get assigned tasks of a user",
		path: "/{id}",
		parameters: {
			path: {
				id: {
					description: "Id of User",
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
					required: true,
				},
			},
		},
		responses: {
			200: {
				model: "User",
				description: "a user object with their assigned tasks",
			},
			404: {
				description: "User with given id is not found",
			},
		},
		summary: "Get requestTasks list",
	})
	private getAssignedTasks(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const userId: string = request.params.id;
		User.findByPk(userId, { include: [TaskRequest] })
			.then((user) => (user ? response.json(user) : next({ statusCode: 404 })))
			.catch(next);
	}
}
