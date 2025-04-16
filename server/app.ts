import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { v4 } from "uuid";
import { sessionStore } from "./controllers/dbController";
import AuthRouter from "./routers/authRouter";
import CardsRouter from "./routers/cardsRouter";
import DevicesRouter from "./routers/devicesRouter";
import CounterRouter from "./routers/counterRouter";

import http from "http";
import { WebSocketServer } from "ws";
import WebSocketController from "./controllers/WebSocketController";
import HistoryRouter from "./routers/historyRouter";

const { PORT } = process.env;

const app = express();
const httpServer = http.createServer(app);
export const wss = new WebSocketServer({ server: httpServer });

app.use(
  cors({
    origin: ["http://192.168.90.145:5173"],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// s;
app.use(
  session({
    genid: () => v4(),
    name: "user",
    secret: "butquna123",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: true,
      maxAge: 60 * 60 * 24 * 365 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(AuthRouter);
app.use(CardsRouter);
app.use(DevicesRouter);
app.use(CounterRouter);
app.use(HistoryRouter);

app.get("/", (req: Request, res: Response) => {
  console.log(req.query);
  res.send("Welcome!");
});

httpServer.listen(PORT, () => {
  console.log("Server is Running on port:", PORT);
});

WebSocketController();
