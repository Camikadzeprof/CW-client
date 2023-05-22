import '../css/error.css';

const Error = ({statusCode, statusMessage, message}) => {
    return (
        <div className="main_content">
            <div className="info">
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h3>Oops! {statusMessage}</h3>
                            <h1><span>{statusCode}</span></h1>
                        </div>
                        <h2>{message}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;