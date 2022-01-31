import { FC, MutableRefObject, ReactNode } from "react"

type Props = {
    text: string,
    onClickCallback: (event: any) => void,
    extras?: string
}
export const Button: FC<Props> = ({ text, onClickCallback, extras }) => {
    return (
        <button onClick={onClickCallback} className={`px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${extras}`}>
            {text}
        </button>
    )
}

export const FlexContainer: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <div className="h-full bg-red-100 w-screen flex flex-col items-center justify-center">
            {children}
        </div>
    )
}

export const Container: FC<{ children?: ReactNode, itemsat: string, extras?: string }> = ({ children, itemsat, extras }) => {

    let classNames = `flex items-${itemsat} justify-center h-auto md:w-3/6 min-w-md`

    if (extras !== undefined)
        classNames += ` ${extras}`

    return (
        <div className={classNames}>
            {children}
        </div>
    )
}

export const InputField: FC<{ inputRef: MutableRefObject<null>, placeholder: string }> = ({ inputRef, placeholder}) => {
    return (
        <input autoFocus={true} className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mr-5 w-5/6 m-1" ref={inputRef} type='text' placeholder={placeholder} />
    )
}
