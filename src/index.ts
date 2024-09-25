import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./config/configs";
// import {read, write} from "./fs.service";
import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const {name, email, password} = req.body;
//
//         if (!name || name.length < 3) {
//             // return res
//             //     .status(400)
//             //     .send("Name is required and should be at least 3 characters long");
//             throw new ApiError("Name is required and should be at least 3 characters long", 400)
//         }
//
//         if (!email || email.includes("@")) {
//             // return res.status(400).send("Email is required and should be valid");
//             throw new ApiError("Email is required and should be valid", 400)
//         }
//
//         if (!password || password.length < 6) {
//             // return res
//             //     .status(400)
//             //     .send("Password is requied and should be at least 6 character long");
//             throw new ApiError("Password is requied and should be at least 6 character long", 400)
//         }
//
//         const users = await read();
//
//         //TODO validate data
//         const id = users.length ? users[users.length - 1]?.id + 1 : 1;
//         const newUser: any = {id, name, email, password};
//         users.push(newUser);
//
//         await write(users);
//
//         res.status(201).send(newUser);
//     } catch (e) {
//         // res.status(500).send(e.message);
//         next(e);
//     }
// });
//
// app.get("/users/:userId", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await read();
//
//         // const userId = Number(req.params.userId);
//         const userId = req.params.userId;
//         const user = users.find((user) => user.id === userId);
//
//         if (!user) {
//             // return res.status(404).send("User not found");
//             throw new ApiError('User not found', 404)
//         }
//         res.send(user);
//     } catch (e) {
//         // res.status(500).send(e.message);
//         next(e)
//     }
// });
//
// app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await read();
//         res.send(users);
//     } catch (e) {
//         // res.status(500).send(e.message);
//         next(e)
//     }
// });
//
// app.put("/users/:userId", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // const userId = Number(req.params.userId);
//         const userId = req.params.userId;
//
//         const {name, email, password} = req.body;
//
//         if (!name || name.length < 3) {
//             // return res
//             //     .status(400)
//             //     .send("Name is required and should be at least 3 characters long");
//             throw new ApiError("Name is required and should be at least 3 characters long", 400)
//         }
//
//         if (!email || email.includes("@")) {
//             // return res.status(400).send("Email is required and should be valid");
//             throw new ApiError("Email is required and should be valid", 400)
//         }
//
//         if (!password || password.length < 6) {
//             // return res
//             //     .status(400)
//             //     .send("Password is requied and should be at least 6 character long");
//             throw new ApiError("Password is requied and should be at least 6 character long", 400)
//         }
//
//         const users = await read();
//
//         const userIndex = users.findIndex((user) => user.id === userId);
//
//         if (userIndex === -1) {
//             // return res.status(404).send("User not found");
//             throw new ApiError("User not found", 404)
//         }
//
//         //TODO validate data
//         // users[userIndex] = {...users[userIndex], name, email, password};
//         users[userIndex].name = name;
//         users[userIndex].email = email;
//         users[userIndex].password = password;
//
//         await write(users);
//         res.status(201).send(users[userIndex]);
//     } catch (e) {
//         // res.status(500).send(e.message);
//         next(e)
//     }
// });
//
// app.delete("/users/:userId", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // const userId = Number(req.params.userId);
//         const userId = req.params.userId;
//
//         const users = await read();
//
//         const userIndex = users.findIndex((user) => user.id === userId);
//
//         if (userIndex === -1) {
//             // return res.status(404).send("User not found");
//             throw new ApiError("User not found", 404)
//         }
//
//         users.splice(userIndex, 1);
//
//         await write(users);
//
//         res.sendStatus(204);
//     } catch (e) {
//         // res.status(500).send(e.message);
//         next(e)
//     }
// });

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, async () => {
  await mongoose.connect(configs.MONGO_URI);
  console.log(
    `Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
  );
});
