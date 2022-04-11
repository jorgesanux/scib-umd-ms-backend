class APIError extends Error{
    constructor(statusCode, message){
        super(message);
        this.name = this.constructor.name;
        this.status = statusCode;
    }

    toJSON(){
        return {
            status: this.status,
            message: this.message,
            result: null,
            results: []
        };
    }
}

export default APIError;