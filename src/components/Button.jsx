
function Button ({title, onclick}) {
    return (
        <button onClick={onclick} className="text-white bg-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-400 px-6 py-2 hover:cursor-pointer">{title}</button>
    )
}

export default Button;