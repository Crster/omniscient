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
import { Select } from "../theme/Select";

export default function EditUserModal({ user, disclosure, onClose }) {
  const { isOpen } = disclosure;
  

  const roles = [
    {
      key: "admin",
      value: "Admin",
    },
    {
      key: "validator",
      value: "Validator",
    },
    {
      key: "surveyor",
      value: "Surveyor",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        if (onClose && !isOpen) {
          onClose();
        }

        disclosure.onOpenChange(isOpen);
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
                defaultValue={user.name}
              />
              <PrimaryInput
                isReadOnly={true}
                label="Email"
                placeholder="Input Email"
                defaultValue={user.email}
              />
              <PasswordInput
                label="New Password"
                placeholder="Input Password"
              />
              <Select
                label="User Role"
                placeholder="Select Role"
                items={roles}
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
