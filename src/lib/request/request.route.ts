import { NextFunction, Router, Response, Request } from "express";
import { Request as TaskRequest } from "../request/Request";
import { RequestLog as TaskRequestLog } from "../requestLog/RequestLog";

import {
	ApiOperationGet,
	ApiOperationPut,
	ApiOperationPost,
	ApiPath,
	SwaggerDefinitionConstant,
} from "swagger-express-typescript";

@ApiPath({
	name: "request",
	path: "/requests",
})
export class TaskRequestRoute {
	router: Router;

	constructor() {
		this.router = Router();
		this.setupRoutes();
	}

	public getRoute(): Router {
		return this.router;
	}

	setupRoutes() {
		this.router.post("/requests", this.createTaskRequest);
		this.router.get("/requests", this.getTaskRequests);
		this.router.get("/requests/:id", this.getTaskRequest);
		this.router.put("/requests/:id", this.updateTaskRequest);
	}

	@ApiOperationPost({
		description: "Post a task request object",
		parameters: {
			body: {
				description: "New Task Request",
				model: "Request",
				required: true,
			},
		},
		responses: {
			200: {
				model: "Request",
			},
			400: { description: "Parameters fail" },
		},
		summary: "Post new task request",
	})
	private createTaskRequest(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const taskRequest = request.body;
		TaskRequest.create(taskRequest)
			.then((taskRequest) => response.json(taskRequest))
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get Task Request objects list",
		responses: {
			200: {
				model: "Request",
				type: SwaggerDefinitionConstant.Response.Type.ARRAY,
			},
		},
		summary: "Get task requests list",
	})
	private getTaskRequests(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		return TaskRequest.findAll()
			.then((taskRequests) => response.json(taskRequests))
			.catch(next);
	}

	@ApiOperationGet({
		description: "Get a taskRequest",
		responses: {
			200: {
				model: "Request",
			},
			404: {
				description: "TaskRequest with given id is not found",
			},
		},
		summary: "Get requestTasks list",
	})
	private getTaskRequest(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const requestTaskId: string = request.params.id;
		TaskRequest.findByPk(requestTaskId, { include: [TaskRequestLog] })
			.then((taskRequest) =>
				taskRequest ? response.json(taskRequest) : next({ statusCode: 404 })
			)
			.catch(next);
	}

	@ApiOperationPut({
		description: "Update a task request",
		path: "/{id}",
		parameters: {
			path: {
				id: {
					description: "Id of Task Request",
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
					required: true,
				},
			},
			body: {
				description: "Updated Task Request",
				model: "Request",
				required: true,
			},
		},
		responses: {
			200: {
				model: "Request",
			},
			404: {
				description: "TaskRequest with given id is not found",
			},
		},
		summary: "Updated task request",
	})
	private updateTaskRequest(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const requestTaskId: string = request.params.id;
		const requestBody = request.body;
		return TaskRequest.update(requestBody, { where: { id: requestTaskId } })
			.then((taskRequest) =>
				taskRequest ? response.json(taskRequest) : next({ statusCode: 404 })
			)
			.catch(next);
	}
}
