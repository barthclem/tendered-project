import { Sequelize } from "sequelize-typescript/";

import { User } from "../users/User";
import { Request } from "../request/Request";
import { RequestLog } from '../requestLog/RequestLog';
import { Company } from "../company/Company";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: ":memory",
	models: [User, Request, RequestLog, Company],
});

export const initDb = async () => {
	const companyA = await  new Company({ name: "Alpha" }).save();
	new Company({ name: "Beta" }).save();
	new Company({ name: "CMCT" }).save();
	console.log(`Created company is => ${JSON.stringify(companyA)}`);
	new User({
		name: "kays",
		email: "barth@kl.com",
		companyId: companyA.id,
	}).save();
};
