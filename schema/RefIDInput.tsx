import { Box, Button, Flex, Code } from "@sanity/ui";
import { set, type StringInputProps } from "sanity";
import { customAlphabet } from "nanoid";
import { useCallback, useEffect } from "react";
const nanoId = customAlphabet("1234567890ABCDEFGHJKLMNPQRSTUVWXYZ", 6);

export function RefIDInput(props: StringInputProps) {
  const { onChange } = props;

  const generateRef = useCallback(() => {
    const refId = nanoId(6);
    onChange(set(refId));
  }, [onChange]);

  useEffect(() => {
    if (!props.value) {
      generateRef();
    }
  }, []);

  return (
    <Flex gap={3} align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      {props.value ? <Code size={6}>{props.value}</Code> : null}
      <Button mode="ghost" text="Generate Ref" onClick={generateRef} />
    </Flex>
  );
}
