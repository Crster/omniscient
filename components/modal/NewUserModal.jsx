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
import { useState } from "react";
import { Select } from "../theme/Select";
import { userRoles } from "@/services/data/user-role";

export default function NewUserModal({ disclosure, onNew }) {
  const { isOpen, onOpenChange } = disclosure;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleOk = () => {
    if (onNew) {
      onNew({ name, email, password, role });
    }
  };

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
              <PrimaryInput
                label="Name"
                placeholder="Input Name"
                value={name}
                onValueChange={setName}
              />
              <PrimaryInput
                label="Email"
                placeholder="Input Email"
                value={email}
                onValueChange={setEmail}
              />
              <PasswordInput
                label="New Password"
                placeholder="Input Password"
                value={password}
                onValueChange={setPassword}
              />
              <Select
                label="User Role"
                placeholder="Select Role"
                items={userRoles}
                selectedKeys={role}
                onSelectionChange={setRole}
              />
            </ModalBody>
            <ModalFooter className="flex flex-row justify-evenly">
              <SecondaryButton fullWidth onPress={onClose}>
                No
              </SecondaryButton>
              <PrimaryButton fullWidth onPress={handleOk}>
                Save
              </PrimaryButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
