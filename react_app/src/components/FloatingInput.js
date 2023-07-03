
export const FloatingInput = (props) => {
    return <div className="form-floating mb-3">
        <input
            type={props.type || "text"}
            className="form-control"
            value={props.value}
            id={props.id}
            name={props.name || props.id}
            placeholder={props.placeholder || props.label}
            onChange={props.handleInput}
            {...props.inputAttributes}
        />
        <label
            htmlFor={props.id}>
            {props.label}</label>
    </div>
}