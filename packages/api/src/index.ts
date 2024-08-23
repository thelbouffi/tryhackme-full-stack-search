import app from "./app";
import { PORT } from "./config";
import { connectToDatabase, closeDatabaseConnection } from "./config/database";

const startServer = async () => {
  await connectToDatabase(process.env.DATABASE_URL as string); // Ensure connection on startup

  const server = app.listen(PORT, () => {
    console.log(`API Server started on port ${PORT}`);
  });

  process.on("SIGINT", async () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(async () => {
      console.log("HTTP server closed");
      await closeDatabaseConnection();
      process.exit(0);
    });
  });

  process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(async () => {
      console.log("HTTP server closed");
      await closeDatabaseConnection();
      process.exit(0);
    });
  });
};

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
