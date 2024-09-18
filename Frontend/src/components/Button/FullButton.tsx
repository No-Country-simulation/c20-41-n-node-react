

type Props = {
    title: string
    type?: "button" | "submit"
    color: "blue" | "white"
    loading?: JSX.Element 
}

const BUTTON_COLORS = {
    blue: "text-white bg-blue-600 hover:bg-blue-700",
    white: "text-black bg-white hover:bg-slate-200",
  };

function FullButton({title, type="button", color, loading}: Props) {
  return (
    <button
      type={type}
      className={"py-2 rounded-lg font-semibold flex gap-2 items-center justify-center " + BUTTON_COLORS[color]}
    >
      {title} {loading}
    </button>
  );
}

export default FullButton;
