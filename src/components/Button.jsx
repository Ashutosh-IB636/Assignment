
function Button ({title, onclick}) {
    return (
        <button onClick={onclick} className="text-white bg-blue-500 rounded-lg font-semibold px-4 py-1.5 cursor-pointer">{title}</button>
    )
}

export default Button;