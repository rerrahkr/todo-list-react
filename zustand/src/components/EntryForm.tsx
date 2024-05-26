import { useAddTodo } from "@/hooks";
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
  }, [reset, isSubmitSuccessful]);

  const addTodo = useAddTodo();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTodo(data.text);
    data.text = "";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
