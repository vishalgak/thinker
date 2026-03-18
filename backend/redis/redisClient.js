const redis = require("redis");

let redisClient;

const initializeRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
    });

    redisClient.on("connect", () => {
      console.log("Redis Connected ✅");
    });

    redisClient.on("error", (err) => {
      console.error("Redis Error ❌:", err.message);
    });

    await redisClient.connect();

    console.log("Redis ready 🚀");

    // Test
    await redisClient.set("test", "hello");
    const val = await redisClient.get("test");
    console.log("Redis test:", val);

  } catch (err) {
    console.error("Failed to initialize Redis ❌:", err.message);
  }
};

module.exports = {
  redisClient,
  initializeRedis,
};