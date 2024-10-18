import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { MdOutlineWarning } from "react-icons/md";

import { DangerButton, SecondaryButton } from "@/components/theme/Button";

export default function RemoveUserModal({ user, disclosure, onRemove }: any) {
  const { isOpen, onOpenChange } = disclosure;

  const handleOk = () => {
    if (onRemove) {
      onRemove(user);
    }
  };

  return (
    <Modal backdrop="blur" isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row gap-3 text-2xl items-center">
              <MdOutlineWarning className="inline text-red-600" />
              Remove
            </ModalHeader>

            <ModalBody>
              <p>
                Are you sure that you want to remove{" "}
                <span className="font-medium">
                  {user.role} - {user.name}
                </span>
                ?
              </p>
            </ModalBody>

            <ModalFooter className="flex flex-row justify-evenly">
              <SecondaryButton fullWidth onPress={onClose}>
                No
              </SecondaryButton>

              <DangerButton fullWidth onPress={handleOk}>
                Remove
              </DangerButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
