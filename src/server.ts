/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { Request, Response } from "express";
import { createServer } from "http";
import next from "next";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom route example with TypeScript
  server.get("/custom-route", (req: Request, res: Response) => {
    return app.render(req, res, "/custom-page");
  });

  // Handle all other routes
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const httpServer = createServer(server);

  //@ts-expect-error
  httpServer.listen(port, (err: unknown) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
