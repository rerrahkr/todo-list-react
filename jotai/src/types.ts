import { nanoid } from "nanoid";

type Id = string & { Id: never };
const newId = () => nanoid() as Id;

type Todo = {
  id: Id;
  text: string;
};

export type { Id };
export { newId };

export type { Todo };
