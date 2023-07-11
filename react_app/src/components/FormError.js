export const FormError = ({ error, field }) => {
    console.log(error, field)
    let errorInfo = ""
    if(Array.isArray(error)) {
        errorInfo = error.map(x => {
            return <div>{field} {x.toString()}</div>
        })
    }
    else {
        errorInfo = <div>{field} {error.toString()}</div>
    }
    return <div className="alert alert-danger" role="alert" style={{ padding: ".3rem .3rem" }}>{errorInfo}</div>
}