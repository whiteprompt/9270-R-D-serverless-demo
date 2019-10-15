const uuidv4 = require('uuid/v4');
const common = require('../Common/aurora');
const Client = require('serverless-mysql');

exports.func = async (_, obj) => {
  var client = Client({
    config: {
      host:     process.env.AURORA_HOST,
      database: process.env.DB_NAME,
      user:     process.env.USERNAME,
      password: process.env.PASSWORD
    }
  });

  console.log("==============================================================");
  console.log('client.getConfig()\n\n');
  console.log(client.getConfig());
  console.log("==============================================================\n\n");

  await common.init(client);
  const userUUID = uuidv4();

  let user = await client.query('INSERT INTO users (uuid, name) VALUES(?,?)', [userUUID, obj.input.Name]);
  for (let index = 0; index < obj.input.Posts.length; index++) {
    const element = obj.input.Posts[index];
    await client.query('INSERT INTO posts (uuid, text, user_id) VALUES(?, ?, ?)',
      [uuidv4(), element.Text, user.insertId]);
  }
  var resp = await common.getUser(client, userUUID);

  console.log("==============================================================");
  console.log('resp\n\n');
  console.log(resp);
  console.log("==============================================================\n\n");

  client.quit();
  return resp;
};
