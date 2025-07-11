import { ButtonHTMLAttributes } from "react"
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    type?: 'button' | 'submit'
    full?: boolean;
  }
  
  export function Button({ children, type = 'button', full = false, className, ...props }: ButtonProps) {
    return (
      <button
        type={type}
        className={clsx("px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-700 rounded-md font-semibold",
          full && "w-full", className)}
      >
        {children}
      </button>
    )
  }
  