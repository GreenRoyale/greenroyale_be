import config from "config";
import "reflect-metadata";
import app from "./app";
import AppDataSource from "./datasource";
import log from "./utils/logger";

const port = config.get<number>("port");

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      log.info(`App is listening on port ${port}`);
    });
  })
  .catch((error) => log.error(error));
