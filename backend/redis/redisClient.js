const redis = require("redis");

let redisClient;

const initializeRedis = async () => {
  // ❌ Agar REDIS_URL nahi hai → Redis skip kar do
  if (!process.env.REDIS_URL) {
    console.log("Redis disabled ❌");
    return;
  }

  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
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