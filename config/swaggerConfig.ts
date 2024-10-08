import config from "config";
import swaggerJsdoc, { SwaggerDefinition } from "swagger-jsdoc";
import { version } from "../package.json";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "GreenRoyale API with Swagger",
    version,
    description: "API documentation for the GreenRoyale project",
  },
  servers: [
    {
      url: `http://localhost:${config.get<number>("port")}/`,
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "default",
      description: "General routes",
    },
    {
      name: "Authentication",
      description: "Authentication routes",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  externalDocs: {
    url: config.get<string>("swaggerUrl") || "",
  },
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/services/*.ts",
    "./src/schema/*.ts",
    "./src/docs/*.ts",
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
