export const Input = ({ label, register, placeholder, required, error, type }) => {

    const getInputStyle = () => {
        return "border text-base min-w-[20rem] w-full text-slate-700 rounded-lg block p-2 outline-none"
    }

    const getFocusStyle = () => {
        return error ? "border-red-500 outline-2 focus:outline-red-300 outline-offset-1" : "border-stone-400 focus:border-teal-500 outline-2 focus:outline-teal-300 outline-offset-1"
    }

    return (
        <div className='relative w-full'>
            <input
                type={type}
                {...register(label, { required: required })}
                className={`${getInputStyle()} ${getFocusStyle()}`}
                placeholder={placeholder} required={required}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <span className="absolute -bottom-5 left-0 text-red-500 text-xs">{error.message}</span>}
        </div>
    )
}