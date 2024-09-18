import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import InputError from "../Message/InputError";

type Props = {
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  error_color?: "red" | "yellow";
};

function DateInput({
  name,
  placeholder,
  register,
  errors,
  error_color,
}: Props) {
  return (
    <label>
      <div className="grid md:grid-cols-2 text-black gap-x-2 gap-y-3 ps-1 text-base">
        {placeholder}
        <input
          type="date"
          max={new Date().toISOString().split("T")[0]}
          className="ps-2 pb-1 text-black border-b-2 bg-transparent border-gray-200 focus:outline-none"
          {...register(name, {
            required: {
              value: true,
              message: "Este campo es obligatorio",
            },
          })}
        />
      </div>
      {errors[name] && (
        <InputError
          color={error_color}
          message={String(errors[name].message)}
        />
      )}
    </label>
  );
}

export default DateInput;
