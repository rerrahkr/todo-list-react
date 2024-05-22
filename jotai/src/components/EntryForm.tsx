import { addTodoAtom } from "@/atoms";
import { useSetAtom } from "jotai";
import type React from "react";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  text: string;
};

function EntryForm(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const addTodo = useSetAtom(addTodoAtom);

  const submit: SubmitHandler<Inputs> = (data) => {
    addTodo(data.text);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input
        type="text"
        {...register("text", { required: true, pattern: /[\S]+/ })}
      />
      <button type="submit" disabled={!isDirty || !isValid}>
        Add
      </button>
    </form>
  );
}

export { EntryForm };
