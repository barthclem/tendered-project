import {
	Model,
	Table,
	Column,
	IsEmail,
	HasMany,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";

import {
	ApiModel,
	ApiModelProperty,
	SwaggerDefinitionConstant,
} from "swagger-express-typescript";

import {Request} from '../request/Request'
import {Company} from '../company/Company'

@ApiModel({
	description: "A User belonging to a company",
	name: "User",
})
@Table
export class User extends Model {
	@ApiModelProperty({
		description: "name of the user",
		required: true,
	})
	@Column
	name: string;

	@ApiModelProperty({
		description: "the email of the user",
		required: true,
	})
	@IsEmail
	@Column
	email: string;

	@ApiModelProperty({
		description: "the id of the company that the user belong",
		required: true,
	})
	@ForeignKey(() => Company)
	@Column
	companyId: number;

	@BelongsTo(() => Company)
	company: Company;

	@ApiModelProperty({
		description: "the list of requests in assigned to a user",
		model: 'Request',
		itemType: SwaggerDefinitionConstant.Response.Type.ARRAY,
		required: false,
	})
	@HasMany(() => Request)
	assignedRequests: Request[];
}