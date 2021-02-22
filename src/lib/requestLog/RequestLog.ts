import {
	Model,
	Table,
	Column,
	IsIn,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";

import {
	ApiModel,
	ApiModelProperty,
	SwaggerDefinitionConstant,
} from "swagger-express-typescript";

import { Request } from "../request/Request";


@ApiModel({
	description: "Tracker of status changes of request object",
	name: "RequestLog",
})
@Table
export class RequestLog extends Model {
	@ApiModelProperty({
		description: "description of request before status update",
		itemType: SwaggerDefinitionConstant.Response.Type.STRING,
		required: true,
	})
	description: string;

	@ApiModelProperty({
		description: "the status of request before update",
		itemType: SwaggerDefinitionConstant.Response.Type.STRING,
		required: true,
	})
	@IsIn({
		msg: "Invalid Request Status",
		args: [["Created", "In Progress", "Completed", "Cancelled"]],
	})
	@Column
	oldStatus: string;

	@ApiModelProperty({
		description: "the status of request before after",
		itemType: SwaggerDefinitionConstant.Response.Type.STRING,
		required: true,
	})
	@IsIn({
		msg: "Invalid Request Status",
		args: [["Created", "In Progress", "Completed", "Cancelled"]],
	})
	@Column
	newStatus: string;

	@ForeignKey(() => Request)
	@Column
	requestId: number;

	@BelongsTo(() => Request)
	request: Request;
}
