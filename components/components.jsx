import { FC, MutableRefObject, ReactNode } from "react"


export const Button = ({ text, onClickCallback, extras }) => {
    return (
        <button onClick={onClickCallback} className={`px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${extras}`}>
            {text}
        </button>
    )
}

export const FlexContainer = ({ children }) => {
    return (
        <div className="h-full bg-red-100 w-screen flex flex-col items-center justify-center">
            {children}
        </div>
    )
}

export const Container = ({ children, itemsat, extras }) => {

    let classNames = `flex items-${itemsat} justify-center h-auto md:w-3/6 min-w-md`

    if (extras !== undefined)
        classNames += ` ${extras}`

    return (
        <div className={classNames}>
            {children}
        </div>
    )
}

export const InputField = ({ inputRef, placeholder, type = 'text', extras = ''}) => {
    return (
        <input autoFocus={true} className={`shadow appearance-none border rounded text-grey-darker  py-2 px-3  m-1 ${extras}`} ref={inputRef} type={type} placeholder={placeholder} />
    )
}
