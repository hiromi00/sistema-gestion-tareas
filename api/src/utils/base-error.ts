class BaseError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly message: string;
  public readonly data: any;

  constructor(statusCode: number, code: string, message: string, data?: any, description?: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;

    Error.captureStackTrace(this);
  }
}

export { BaseError };
