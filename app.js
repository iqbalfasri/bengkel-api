const restify = require("restify");
const router = new (require("restify-router")).Router();
const server = restify.createServer({
  name: "bengkel-api",
  version: "1.0.0"
});

require("dotenv").config();
// Connect to database
require("./database").connect();

const logger = require("./basic-logger");

// Routes
const home = require("./routes/index");
const montir = require("./routes/montir");
const customer = require("./routes/customer");
const service = require("./routes/service");
const kendaraan = require("./routes/kendaraan");
const barang_jasa = require("./routes/barang-jasa");
const service_detail = require("./routes/service-detail");

server.use(
  restify.plugins.throttle({
    burst: 100, // Max 10 concurrent requests (if tokens)
    rate: 2, // Steady state: 2 request / 1 seconds
    ip: true // throttle per IP
  })
);
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

// API Endpoint's
router.add("/api", home);
router.add("/montir", montir);
router.add("/customer", customer);
router.add("/barang-jasa", barang_jasa);
router.add("/kendaraan", kendaraan);
router.add("/service", service);
router.add("/service-detail", service_detail);
router.applyRoutes(server);

server.on(
  "after",
  restify.plugins.metrics({ server: server }, function onMetrics(err, metrics) {
    logger.trace(
      `${metrics.method} ${metrics.path} ${metrics.statusCode} ${
        metrics.latency
      } ms`
    );
  })
);

server.listen(8080, function() {
  logger.info("%s listening at %s", server.name, server.url);
});

server.on("uncaughtException", function(req, res, route, err) {
  logger.error(err);
});
