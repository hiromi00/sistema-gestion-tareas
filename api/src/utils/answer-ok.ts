import { HttpStatusCodes } from '../constants';

interface Response {
  statuscode: number;
  code: string;
  data: any;
}

export const answerOK = (
  data: any,
  statuscode: number = HttpStatusCodes.OK,
  code: string = 'OK'
): Response => {
  return {
    statuscode,
    code,
    data,
  };
};
