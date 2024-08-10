"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { DangerButton, SecondaryButton } from "../theme/Button";
import { MdOutlineWarning } from "react-icons/md";

export default function RemoveUserModal({ user, disclosure, onClose }) {
  const { isOpen } = disclosure;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        if (onClose && !isOpen) {
          onClose()  
        }
        
        disclosure.onOpenChange(isOpen)
      }}
      isDismissable={false}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row gap-3 text-2xl items-center">
              <MdOutlineWarning className="inline text-red-600"/>Remove
            </ModalHeader>
            <ModalBody>
              <p>Are you sure wish to delete this <span className="font-medium">{user.role}</span> member <span className="font-medium">{user.name}</span>?</p>
            </ModalBody>
            <ModalFooter className="flex flex-row justify-evenly">
              <SecondaryButton fullWidth onPress={onClose}>
                No
              </SecondaryButton>
              <DangerButton fullWidth onPress={onClose}>
                Delete
              </DangerButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
