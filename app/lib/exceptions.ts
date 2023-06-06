export class AuthRequiredError extends Error {
    constructor(message = 'Authentication is required to perform this action.') {
        super(message);
        this.name = 'AuthRequiredError';
    }
}

export class UnauthorizedError extends Error {
    constructor(message = 'You are not authorised to perform this action.') {
        super(message);
        this.name = 'UnauthorisedError';
    }
}