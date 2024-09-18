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

function NumberInput({
  name,
  placeholder,
  register,
  errors,
  error_color,
  classes,
}: Props) {
  return (
    <label className="flex flex-col">
      <input
        type="number"
        placeholder={placeholder}
        className={
          "ps-2 pb-1 border-b-2 bg-transparent border-gray-200 focus:outline-none text-base " +
          classes
        }
        {...register(name, {
          required: { value: true, message: "Este campo es requerido" },
          pattern: {
            value: /\d+/,
            message: "Este campo debe ser un número",
          },
          min: {
            value: 0,
            message: "Este campo debe ser un número entero",
          },
          maxLength: {
            value: 9,
            message: "Este campo no puede tener más de 9 dígitos",
          },
        })}
      />
      {errors[name] && (
        <InputError
          color={error_color}
          message={String(errors[name].message)}
        />
      )}
    </label>
  );
}

export default NumberInput;
