import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import InputError from "../Message/InputError";

type Props = {
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  error_color?: "red" | "yellow";
  classes?: string;
};

function TextInput({
  name,
  placeholder,
  register,
  errors,
  error_color,
  classes,
}: Props) {
  return (
    <label className="flex flex-col">
      <textarea
        rows={16}
        placeholder={placeholder}
        className={
          "p-4 border-2 rounded-lg bg-transparent border-gray-400 focus:outline-none text-base resize-none" +
          classes
        }
        {...register(name, {
          required: { value: true, message: "Este campo es requerido" },
        })}
      ></textarea>
      {errors[name] && (
        <InputError
          color={error_color}
          message={String(errors[name].message)}
        />
      )}
    </label>
  );
}

export default TextInput;
