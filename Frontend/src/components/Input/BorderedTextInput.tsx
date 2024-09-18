import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import InputError from "../Message/InputError";

type Props = {
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  title: string;
  error_color?: "red" | "yellow";
  classes?: string;
  value?: string;
};

function BorderedTextInput({
  name,
  placeholder,
  register,
  errors,
  error_color,
  classes,
  title,
  value
}: Props) {
  return (
    <article className="flex flex-col">
      <label className="flex flex-col justify-start md:items-center gap-4 md:grid md:grid-cols-[1fr_4fr]">
        <span className="text-lg">{title}:</span>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className={
            "p-2 border-2 rounded-lg w-full bg-transparent border-gray-400 focus:outline-none text-base invalid:border-red-600 " +
            classes
          }
          {...register(name, {
            required: { value: true, message: "Este campo es requerido" },
          })}
        />
      </label>

      {errors[name] && (
        <InputError
          color={error_color}
          message={String(errors[name].message)}
        />
      )}
    </article>
  );
}

export default BorderedTextInput;
