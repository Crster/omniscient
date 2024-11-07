import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { MdOutlineQuestionMark, MdOutlineWarning } from "react-icons/md";
import { ReactNode } from "react";

import { DangerButton, PrimaryButton, SecondaryButton } from "@/components/theme/Button";

export function AskModal(props: {
  children: ReactNode;
  title?: ReactNode;
  open: boolean;
  danger?: boolean;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
  onClose: () => void;
}) {
  return (
    <Modal backdrop="blur" isDismissable={false} isOpen={props.open} onOpenChange={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row gap-3 text-2xl items-center">
              {props.danger ? (
                <MdOutlineWarning className="inline text-red-600" />
              ) : (
                <MdOutlineQuestionMark className="inline text-blue-600" />
              )}
              {props.title}
            </ModalHeader>

            <ModalBody>{props.children}</ModalBody>

            <ModalFooter className="flex flex-row justify-evenly">
              <SecondaryButton fullWidth onPress={onClose}>
                {props.cancelText || "No"}
              </SecondaryButton>

              {props.danger ? (
                <DangerButton fullWidth onPress={props.onOk}>
                  {props.okText || "Yes"}
                </DangerButton>
              ) : (
                <PrimaryButton fullWidth onPress={props.onOk}>
                  {props.okText || "Yes"}
                </PrimaryButton>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
