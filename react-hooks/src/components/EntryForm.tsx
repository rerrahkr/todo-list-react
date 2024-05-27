import { useTodosDispatch } from "@/hooks";
import { addTodo } from "@/reducer";
import type React from "react";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  text: string;
};

function EntryForm(): React.JSX.Element {
  const dispatch = useTodosDispatch();

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(addTodo(data.text));
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
