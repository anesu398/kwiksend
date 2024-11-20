const Redis = require("ioredis");
const redis = new Redis();

const RateLimiter = {
  limit(maxRequests, timeWindow) {
    return async (req, res, next) => {
      const key = `rate-limit:${req.ip}`;
      const currentCount = await redis.incr(key);

      if (currentCount === 1) {
        await redis.expire(key, Math.ceil(timeWindow / 1000)); // Set TTL in seconds
      }

      if (currentCount > maxRequests) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later."
        });
      }

      next();
    };
  }
};

module.exports = RateLimiter;
