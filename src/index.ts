import "reflect-metadata";
import config from "../config/default";
import app from "./app";
import AppDataSource from "./datasource";
import log from "./utils/logger";

const port = config.port;

AppDataSource.initialize()
  .then(async (data) => {
    if (data.isInitialized) {
      log.info("Database started");
      app.listen(port, () => {
        log.info(`App is listening on port ${port}`);
      });
    }
  })
  .catch((error) => log.error(error));
