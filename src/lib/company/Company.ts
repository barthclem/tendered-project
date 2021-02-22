import { Model, Table, Column, Unique, HasMany } from "sequelize-typescript";

import {
	ApiModel,
	ApiModelProperty,
	SwaggerDefinitionConstant,
} from "swagger-express-typescript";

import { User } from "../users/User";
import { Request } from "../request/Request"


@ApiModel({
	description: "Company Model",
	name: "Company",
})
@Table
export class Company extends Model {
	@ApiModelProperty({
		description: "a unique name of company",
		required: true,
	})
	@Unique
	@Column
	name: string;

	@ApiModelProperty({
		description: "the list of users in a company",
		model: 'User',
		itemType: SwaggerDefinitionConstant.Response.Type.ARRAY,
	})
	@HasMany(() => User)
	users: User[];

	@ApiModelProperty({
		description: "the list of requests in a company",
		model: 'Request',
		itemType: SwaggerDefinitionConstant.Response.Type.ARRAY,
	})
	@HasMany(() => Request)
	requests: Request[];
}
