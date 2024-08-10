"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { PrimaryButton, SecondaryButton } from "../theme/Button";
import { PasswordInput, PrimaryInput } from "../theme/Input";

export default function EditUserModal({ user, disclosure, onClose }) {
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
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Edit {user.role}
            </ModalHeader>
            <ModalBody>
              <PrimaryInput
                label="Name"
                placeholder="Input Name"
                value={user.name}
              />
              <PrimaryInput
                label="Barangay"
                placeholder="Input Barangay"
                value={user.barangay}
              />
              <PasswordInput
                label="New Password"
                placeholder="Input Password"
              />
              <PrimaryInput
                label="User Role"
                placeholder="Input Role"
                value={user.role}
              />
            </ModalBody>
            <ModalFooter className="flex flex-row justify-evenly">
              <SecondaryButton fullWidth onPress={onClose}>
                No
              </SecondaryButton>
              <PrimaryButton fullWidth onPress={onClose}>
                Save
              </PrimaryButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
