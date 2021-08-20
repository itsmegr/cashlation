require("dotenv").config();
import express, { Application } from "express";
import morgan from "morgan";

//basic server configuration
function ConfigureServer(): Application {
  const app = express();

  // hiding server details
  app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "Java Spring");
    next();
  });

  // parsing body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //HTTP Logging
  console.log(
    process.env.NODE_ENV == "development"
      ? "Configured for Dev Mode"
      : "Configured for Production Mode"
  );

  //loggin the request in development
  if (process.env.NODE_ENV == "development") app.use(morgan("dev"));
  else app.use(morgan("tiny"));

  return app;
}

export default ConfigureServer;
