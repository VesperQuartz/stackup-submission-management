import { AlertCircle, CloudDownload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { match, P } from "ts-pattern";
import { Button } from "./ui/button";
import { nanoid } from "nanoid";

export const ErrorHandler = ({
  state,
}: {
  state: { message: string } | { error: string } | {} | null;
}) => {
  return (
    <>
      {match(state)
        .with({ message: P.string }, (data) => {
          return (
            <Button
              asChild
              className="gap-2"
              type="submit"
              onClick={async () => {}}
              key={nanoid()}
            >
              <a href={data.message}>
                <CloudDownload /> Download
              </a>
            </Button>
          );
        })
        .with({ error: P.string }, (data) => (
          <Alert variant="destructive" key={nanoid()}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{data.error}</AlertDescription>
          </Alert>
        ))
        .otherwise(() => null)}
    </>
  );
};
