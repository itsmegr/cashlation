import ConfigureServer from "./ServerConfig/ConfigureServer";
import ConnectDependencies from "./ServerConfig/ConnectDependencies";
import SinkErrorFor from "./ServerConfig/ErrorHandler";
const server = ConfigureServer();

import HandleRoutesFor from "./ServerConfig/RouteHandlers";

// Route Handling
HandleRoutesFor(server);

// Error Handling
SinkErrorFor(server);

const PORT = process.env.PORT;
ConnectDependencies()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Node app running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
