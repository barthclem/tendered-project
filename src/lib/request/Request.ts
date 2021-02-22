import {
	Model,
	Table,
	Column,
    IsIn,
    HasMany,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";

import {
	ApiModel,
	ApiModelProperty,
	SwaggerDefinitionConstant,
} from "swagger-express-typescript";

import { User } from "../users/User";
import { Company } from "../company/Company"
import { RequestLog } from '../requestLog/RequestLog'


@ApiModel({
	description: "Task Request",
	name: "Request",
})
@Table
export class Request extends Model {
	@ApiModelProperty({
		description: "the description of the request",
		required: true,
	})
	@Column
	description: string;

	@ApiModelProperty({
		description:
			"the type of the request, it must be one of ['BreakDown', 'Maintenance', 'Replacement', 'Demobilisation']",
		required: true,
	})
	@IsIn({
		msg: "Invalid Request Type",
		args: [["BreakDown", "Maintenance", "Replacement", "Demobilisation"]],
	})
	@Column
	type: string;

	@ApiModelProperty({
		description:
			"the status of the request, it must be one of ['Created', 'In Progress', 'Completed', 'Cancelled']",
		required: true,
	})
	@IsIn({
		msg: "Invalid Request Status",
		args: [["Created", "In Progress", "Completed", "Cancelled"]],
	})
	@Column
	status: string;

	@ApiModelProperty({
		description: "the date that the request task is completed",
		itemType: SwaggerDefinitionConstant.Response.Type.STRING,
	})
	@Column
	completedAt: Date;

	@ApiModelProperty({
		description: "the id of the user assigned to the request",
		required: true,
	})
	@ForeignKey(() => User)
	@Column
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@ApiModelProperty({
		description: "the id of the company that initiated this request",
		required: true,
	})
	@ForeignKey(() => Company)
	@Column
	companyId: number;

	@BelongsTo(() => Company)
	company: Company;

	@ApiModelProperty({
		description: "the logs tracking the updates to a log",
		model: "RequestLog",
		itemType: SwaggerDefinitionConstant.Response.Type.ARRAY,
	})
	@HasMany(() => RequestLog)
	requestLogs: RequestLog[];
}
