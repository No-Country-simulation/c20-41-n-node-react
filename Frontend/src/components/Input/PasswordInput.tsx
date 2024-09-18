import { useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

import InputError from "../Message/InputError";

import EyeIcon from "../../icons/Eye";
import EyeoffIcon from "../../icons/Eyeoff";

type Props = {
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
  error_color?: "red" | "yellow";
  classes?: string;
};

function PasswordInput({
  name,
  placeholder,
  register,
  watch,
  errors,
  error_color,
  classes,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="flex flex-col relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={
          "ps-2 pb-1 border-b-2 bg-transparent border-gray-200 focus:outline-none text-base " +
          classes
        }
        {...register(name, {
          required: { value: true, message: "Este campo es requerido" },
          minLength: {
            value: 3,
            message: "La contraseña debe tener entre 3 y 30 caracteres",
          },
          maxLength: {
            value: 30,
            message: "La contraseña debe tener entre 3 y 30 caracteres",
          },
          validate: watch
            ? (value) => {
                if (value === watch("password")) {
                  return true;
                } else {
                  return "Las contraseñas no coinciden";
                }
              }
            : () => true,
        })}
      />
      {errors[name] && (
        <InputError
          color={error_color}
          message={String(errors[name].message)}
        />
      )}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-0 right-0"
      >
        {showPassword ? (
          <EyeoffIcon className="hover:opacity-60" />
        ) : (
          <EyeIcon className="hover:opacity-60" />
        )}
      </button>
    </label>
  );
}

export default PasswordInput;
