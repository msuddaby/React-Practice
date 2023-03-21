import { ClientResponseError } from "pocketbase";
import { DbResponse } from "../db/types";

type Props = {
  error: ClientResponseError;
};

export function DbErrorPage({ error }: Props) {
  const errorType = error.status;

  switch (errorType) {
    case 403:
      return (
        <>
          <h2 className="text-2xl font-semibold mb-3">
            Error: 403 - Unauthorized
          </h2>
          <p className="text-base">
            Cleverly done, Mr. Freeman, but you're not supposed to be here. As a
            matter of fact, you're not. Get back where you belong, and forget
            about all this, until we meet again.
          </p>
        </>
      );
    default:
      return (
        <>
          <h2>Unknown Error</h2>
          <p>An unknown error occured.</p>
        </>
      );
  }
}
