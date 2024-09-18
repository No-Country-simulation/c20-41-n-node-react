import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import InputError from "../Message/InputError";

type Props = {
  name: string;
  options: { name: string; value: string | number }[];
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  error_color?: "red" | "yellow";
  classes?: string;
};

function SelectInput({
  name,
  placeholder,
  options,
  register,
  errors,
  error_color,
  classes,
}: Props) {
  return (
    <label className="flex flex-col">
      <select
        defaultValue={""}
        className={
          "ps-1 pb-1 border-b-2 border-gray-200 text-black focus:outline-none focus:border-gray-300 text-base " +
          classes
        }
        {...register(name, {
          required: {
            value: true,
            message: "Este campo es obligatorio",
          },
          validate: (value) => {
            if (options.some((option) => option.value == value)) {
              return true;
            } else {
              return "Seleccione una de las opciones disponibles";
            }
          },
        })}
      >
        <option className="text-gray-400" value="" disabled>
          {placeholder}
        </option>
        {options.map(({ name, value }, index) => {
          return (
            <option className="text-black" key={index} value={value}>
              {name}
            </option>
          );
        })}
      </select>
      {errors[name] && (
        <InputError
          color={error_color}
          message={String(errors[name].message)}
        />
      )}
    </label>
  );
}

export default SelectInput;
