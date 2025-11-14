/**
 * Request logging middleware
 */

/**
 * Logs incoming requests
 */
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  // Log response when it finishes
  const originalSend = res.send;
  res.send = function (body) {
    console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
    originalSend.call(this, body);
  };

  next();
}

module.exports = requestLogger;

