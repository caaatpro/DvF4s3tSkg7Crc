import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
	const ctx = host.switchToHttp();
	const response = ctx.getResponse<Response>();
	const request = ctx.getRequest<Request>();
	const status = exception.getStatus();

	console.log(exception);

	let message: string[] = [];
	if (exception.message) {
		message.push(exception.message);
	}

	response
	  .status(status)
	  .json({
		statusCode: status,
		message,
	  });
  }
}