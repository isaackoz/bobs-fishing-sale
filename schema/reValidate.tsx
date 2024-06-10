import { Box, Button, Flex, Code } from "@sanity/ui";
import { StringInput, TextInput, set, type StringInputProps } from "sanity";
import { useCallback, useEffect, useState } from "react";

export function ReValidate(props: StringInputProps) {
  const { onChange, value } = props;

  const [status, setStatus] = useState<"success" | "fail" | undefined>();

  const revalidate = useCallback(() => {
    if (!value) return;

    // Send a POST request with the value
    fetch(value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus("success");
      })
      .catch((error) => {
        setStatus("fail");
      });
  }, [value]);

  return (
    <Flex gap={3} align="center">
      <StringInput {...props} />
      <Button mode="ghost" text="Revalidate" onClick={revalidate} />
      {status === "success" && "Success"}
      {status === "fail" && "Fail"}
    </Flex>
  );
}
