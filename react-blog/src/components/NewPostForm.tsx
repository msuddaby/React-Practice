import { FieldError, useForm } from "react-hook-form";
import { NewPostData, PostData } from "../db/types";
import { ValidationError } from "./ValidationError";

type Props = {
  onSave: (newPost: NewPostData) => void;
  editValues?: PostData;
};

export function NewPostForm({ onSave }: Props) {
  const sampleForm = {
    title: "This is a sample title.",
    body: "This is a sample body.",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewPostData>();

  const fieldStyle = "flex flex-col mb-2";
  const labelStyle = "mb-2";
  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? "border border-red-500" : "border border-slate-300";
  }

  return (
    <form noValidate className="" onSubmit={handleSubmit(onSave)}>
      <div className={fieldStyle}>
        {isSubmitSuccessful && (
          <div
            role="alert"
            className="text-black bg-green-300 p-4 rounded text-sm mb-3"
          >
            <p>The post was successfully saved.</p>
          </div>
        )}
        <label htmlFor="title" className={labelStyle}>
          Title
        </label>
        <input
          type="text"
          id="title"
          className={getEditorStyle(errors.title)}
          {...register("title", {
            required: "you must enter a title.",
            minLength: {
              value: 15,
              message: "You must enter more than 15 characters",
            },
          })}
        />
        <ValidationError fieldError={errors.title} />
      </div>
      <div className={fieldStyle}>
        <label htmlFor="body" className={labelStyle}>
          Body
        </label>
        <textarea
          id="body"
          className={getEditorStyle(errors.body)}
          {...register("body", {
            required: "You must enter a body",
          })}
        ></textarea>
        <ValidationError fieldError={errors.body} />
      </div>
      <div className={fieldStyle}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="self-center mt-2 h-10 px-6 font-semibold bg-slate-900 text-slate-50 w-1/4 rounded hover:scale-110 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
