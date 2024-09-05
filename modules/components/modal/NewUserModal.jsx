"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { PrimaryButton, SecondaryButton } from "../theme/Button";
import { PrimaryInput } from "../theme/Input";
import PasswordInput from "../theme/PasswordInput";

export default function NewUserModal({ disclosure }) {
  const { isOpen, onOpenChange } = disclosure

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Add User
            </ModalHeader>
            <ModalBody>
              <PrimaryInput label="Name" placeholder="Input Name" />
              <PrimaryInput label="Email" placeholder="Input Email" />
              <PasswordInput
                label="New Password"
                placeholder="Input Password"
              />
              <PrimaryInput label="User Role" placeholder="Input Role" />
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
