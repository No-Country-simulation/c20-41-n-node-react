import { SVGProps } from "react";

function TimeEditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21 12a9 9 0 1 0 -9.972 8.948c.32 .034 .644 .052 .972 .052" />
      <path d="M12 7v5l2 2" />
      <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" />
    </svg>
  );
}

export default TimeEditIcon;
