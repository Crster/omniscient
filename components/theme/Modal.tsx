import * as NextUI from "@heroui/modal";
import { ReactElement } from "react";

import { PrimaryButton, SecondaryButton } from "./Button";

export default function Modal<TData>(props: {
  data: TData;
  children: (data: NonNullable<TData>) => ReactElement;
  title: string;
  onCancel: () => void;
  onOk: () => void;
  cancelText?: string;
  okText?: string;
}) {
  return (
    <NextUI.Modal backdrop="blur" isDismissable={false} isOpen={!!props.data}>
      <NextUI.ModalContent>
        {props.data && (
          <>
            <NextUI.ModalHeader className="flex flex-col gap-1 text-2xl">{props.title}</NextUI.ModalHeader>
            <NextUI.ModalBody>{props.children(props.data)}</NextUI.ModalBody>

            <NextUI.ModalFooter className="flex flex-row justify-evenly">
              <SecondaryButton fullWidth onPress={props.onCancel}>
                {props.cancelText ?? "Cancel"}
              </SecondaryButton>
              <PrimaryButton fullWidth onPress={props.onOk}>
                {props.okText ?? "Ok"}
              </PrimaryButton>
            </NextUI.ModalFooter>
          </>
        )}
      </NextUI.ModalContent>
    </NextUI.Modal>
  );
}
