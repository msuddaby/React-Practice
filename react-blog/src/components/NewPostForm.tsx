import { TextField, Typography } from "@mui/material";
import { FieldError, useForm } from "react-hook-form";
import { NewPostData, PostData } from "../db/types";
import { ValidationError } from "./ValidationError";

type Props = {
  onSave: (newPost: PostData) => void;
  editValues?: PostData;
};

export function NewPostForm({ onSave, editValues }: Props) {
  let formData = new Object() as PostData;

  if (editValues) {
    formData = editValues;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PostData>({
    defaultValues: formData,
  });

  const fieldStyle = "flex flex-col mb-2";
  const labelStyle = "mb-2";
  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? "border border-red-500" : "border border-slate-300";
  }

  return (
    <form noValidate className="" onSubmit={handleSubmit(onSave)}>
      <Typography component="h2" variant="h5" gutterBottom>
        New Post
      </Typography>
      <div className={fieldStyle}>
        {isSubmitSuccessful && (
          <div
            role="alert"
            className="text-black bg-green-300 p-4 rounded text-sm mb-3"
          >
            <p>The post was successfully saved.</p>
          </div>
        )}
        <TextField
          type="text"
          id="title"
          variant="outlined"
          label="Title"
          error={!!errors.title}
          helperText={errors.title ? errors.title.message : ""}
          {...register("title", {
            required: "you must enter a title.",
            minLength: {
              value: 15,
              message: "You must enter more than 15 characters",
            },
          })}
        />
      </div>
      <div className={fieldStyle}>
        <TextField
          id="body"
          variant="outlined"
          label="Body"
          multiline
          rows={4}
          error={!!errors.body}
          helperText={errors.body ? errors.body.message : ""}
          {...register("body", {
            required: "You must enter a body",
          })}
        ></TextField>
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
