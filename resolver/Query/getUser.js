const common = require('../Common/aurora');
const Client = require('serverless-mysql');

exports.func = async (_, { uuid }) => {
    const client = Client({
        config: {
            host: process.env.AURORA_HOST,
            database: process.env.DB_NAME,
            user: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    });
    await common.init(client);
    const resp = await common.getUser(client, uuid);

    client.quit();
    return resp;
};
