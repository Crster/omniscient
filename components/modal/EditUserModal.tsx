import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useEffect, useState } from "react";

import { PrimaryButton, SecondaryButton } from "@/components/theme/Button";
import { PrimaryInput } from "@/components/theme/Input";
import PasswordInput from "@/components/theme/PasswordInput";
import { Selection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import UserRole from "@/models/UserRole";

export default function EditUserModal({ user, disclosure, onSave }: any) {
  const { isOpen, onOpenChange } = disclosure;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(UserRole.Surveyor);
  const [error, setError] = useState<Record<string, any>>({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
    }
  }, [user]);

  const handleOk = () => {
    if (onSave) {
      onSave({ ...user, name, role, password: password ? password : undefined }).then(setError);
    }
  };

  return (
    <Modal backdrop="blur" isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">Edit {user.role}</ModalHeader>
            <ModalBody>
              <PrimaryInput
                label="Name"
                placeholder="Input Name"
                value={name}
                onValueChange={setName}
                {...error?.["name"]}
              />
              <PrimaryInput defaultValue={user.email} isReadOnly={true} label="Email" placeholder="Input Email" />
              <PasswordInput
                label="New Password"
                placeholder="Input Password"
                value={password}
                onValueChange={setPassword}
                {...error?.["password"]}
              />
              <Selection
                items={enumToKeyLabel(UserRole)}
                label="User Role"
                placeholder="Select Role"
                selectedKeys={[role]}
                onValueChange={setRole}
                {...error?.["role"]}
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
