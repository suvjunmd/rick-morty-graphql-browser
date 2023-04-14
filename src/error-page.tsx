import { useRouteError } from "react-router-dom";

interface ErrorResponse {
  status: number;
  statusText: string;
  data: any;
  error?: Error;
  internal: boolean;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.error?.message}</i>
      </p>
    </>
  );
}