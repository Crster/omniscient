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
import { useEffect, useState } from "react";
import { userRoles } from "@/services/data/user-role";

export default function EditUserModal({ user, disclosure, onSave }) {
  const { isOpen, onOpenChange } = disclosure;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
    }
  }, [user]);

  const handleOk = () => {
    if (onSave) {
      if (password) {
        onSave(user, { name, role, password });
      } else {
        onSave(user, { name, role });
      }
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
              Edit {user.role}
            </ModalHeader>
            <ModalBody>
              <PrimaryInput
                label="Name"
                placeholder="Input Name"
                value={name}
                onValueChange={setName}
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
