// logger.js

const Logger = {
    // Log an informational message
    info(message) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    },
  
    // Log a warning message
    warn(message) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    },
  
    // Log an error message
    error(message) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    },
  
    // Log a debug message
    debug(message) {
      if (process.env.DEBUG === 'true') {
        console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
      }
    }
  };
  
  module.exports = Logger;
  