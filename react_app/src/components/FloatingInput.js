import { FormError } from "./FormError"

export const FloatingInput = (props) => {
    
    return <>
        {props.err && <FormError field={props.label} error={props.err}/>
        }
        <div className="form-floating mb-3">
            <input
                type={props.type || "text"}
                className="form-control"
                value={props.value}
                id={props.id}
                name={props.name || props.id}
                onChange={props.handleInput}
                onBlur={props.onBlur}
                placeholder={props.placeholder || props.label}
                {...props.inputAttributes}
            />
            <label
                htmlFor={props.id}>
                {props.label}</label>
        </div>
    </>
}