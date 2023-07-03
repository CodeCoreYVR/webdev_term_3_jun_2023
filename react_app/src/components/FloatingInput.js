
export const FloatingInput = (props) => {
    
    return <>
        {props.err && <div className="alert alert-danger" role="alert" style={{padding: ".3rem .3rem"}}>
            {`${props.label} ${props.err.toString()}`}
        </div>}
        <div className="form-floating mb-3">
            <input
                type={props.type || "text"}
                className="form-control"
                value={props.value}
                id={props.id}
                name={props.name || props.id}
                onChange={props.handleInput}
                placeholder={props.placeholder || props.label}
                {...props.inputAttributes}
            />
            <label
                htmlFor={props.id}>
                {props.label}</label>
        </div>
    </>
}