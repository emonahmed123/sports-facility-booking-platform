import { ZodError, ZodIssue } from "zod";


type TErrorSource = {
  path: string | number;
  message: string;
}[];
const hangelZodError = (err: ZodError) => {
  const errorSources: TErrorSource = err.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod validation Erorr',
    errorSources,

  };
};

export default hangelZodError