import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useState } from "react";

import { PrimaryButton, SecondaryButton } from "@/components/theme/Button";
import { PrimaryInput } from "@/components/theme/Input";
import PasswordInput from "@/components/theme/PasswordInput";
import { Selection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { UserRoles } from "@/models/User/UserSchema";

export default function NewUserModal({ disclosure, onNew }: any) {
  const { isOpen, onOpenChange } = disclosure;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(UserRoles.Surveyor);

  const handleOk = () => {
    if (onNew) {
      onNew({ name, email, password, role });
    }
  };

  return (
    <Modal backdrop="blur" isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">Add User</ModalHeader>
            <ModalBody>
              <PrimaryInput label="Name" placeholder="Input Name" value={name} onValueChange={setName} />
              <PrimaryInput label="Email" placeholder="Input Email" value={email} onValueChange={setEmail} />
              <PasswordInput
                label="New Password"
                placeholder="Input Password"
                value={password}
                onValueChange={setPassword}
              />
              <Selection
                items={enumToKeyLabel(UserRoles)}
                label="User Role"
                placeholder="Select Role"
                selectedKeys={[role]}
                onValueChange={setRole}
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
