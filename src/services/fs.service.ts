import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const read = async (): Promise<IUser[]> => {
  const pathToFile = path.join(process.cwd(), "db.json");
  const data = await fs.readFile(pathToFile, "utf-8");

  return data ? JSON.parse(data) : [];
};

const write = async (users: IUser[]): Promise<void> => {
  const pathToFile = path.join(process.cwd(), "db.json");

  await fs.writeFile(pathToFile, JSON.stringify(users));
};

export { read, write };
