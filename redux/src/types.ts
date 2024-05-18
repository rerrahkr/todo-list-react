type Id = string & { Id: never };
const newId = () => (Math.random() * 1000).toString().padStart(4, "0") as Id;

type Todo = {
  id: Id;
  text: string;
};

export type { Id };
export { newId };

export type { Todo };
