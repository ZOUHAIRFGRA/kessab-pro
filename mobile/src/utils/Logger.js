import { logger, consoleTransport } from "react-native-logs";

var log = logger.createLogger({
  transport: consoleTransport,
});

export default log;