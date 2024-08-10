"use client";

import { MdOutlineAdd } from "react-icons/md";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { PrimaryButton, SecondaryButton } from "../theme/Button";
import { PasswordInput, PrimaryInput } from "../theme/Input";

export default function NewUserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PrimaryButton
        className="px-2 py-2 w-32 justify-self-end"
        onPress={onOpen}
      >
        <MdOutlineAdd className="inline text-2xl align-top text-white" />
        Add User
      </PrimaryButton>

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
                <PrimaryInput label="Barangay" placeholder="Input Barangay" />
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
    </>
  );
}
