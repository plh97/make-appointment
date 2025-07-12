import http from "http";
import Koa from "koa";
import path from "path";
import cors from "@koa/cors";
import logger from "koa-logger";
import kosStatic from "koa-static";
import koaBody from "koa-body";
import allRouter from "@/routes";
import socket from "./middleware/server-ws";

export const app = new Koa();

const HTTP_PROT = process.env.PORT ?? 8080;

app
  .use(logger())
  .use(koaBody({ multipart: true }))
  // .use(json())
  .use(
    cors({
      // origin: frontendOrigin,
      credentials: true,
      // maxAge: 1000 * 60 * 60 * 24 * 7,
    })
  )
  .use(
    kosStatic(path.resolve("public"), {
      gzip: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
  );

const server = http.createServer(app.callback()).listen(HTTP_PROT, () => {
  console.log(`[NODE] listening at port ${HTTP_PROT}`);
});

app.use(socket(server)).use(allRouter.routes()).use(allRouter.allowedMethods());
