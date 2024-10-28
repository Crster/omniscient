import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";

import { PrimaryButton, SecondaryButton } from "@/components/theme/Button";
import { PrimaryInput } from "@/components/theme/Input";
import PasswordInput from "@/components/theme/PasswordInput";
import { Selection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { UserRole } from "@/services/Data/UserRole";
import { User } from "@/services/User";
import useApiRequest from "@/components/hook/useApiRequest";

const defaultValue: User = {
  name: "",
  email: "",
  password: "",
  role: UserRole.Surveyor,
};

export default function EditUserModal(props: {
  userId: string;
  disclosure: ReturnType<typeof useDisclosure>;
  onSave: (user: User) => Promise<any>;
}) {
  const { isOpen, onOpenChange } = props.disclosure;

  const api = useApiRequest();
  const [user, setUser] = useState<User>(defaultValue);
  const [error, setError] = useState<Record<string, any>>({});

  useEffect(() => {
    if (props.userId) {
      api("get-user", props.userId).then((response) => {
        if (response.status === "success") setUser(response.data);
      });
    }
  }, [props.userId]);

  const handleValueChange = (property: string) => {
    return (value: any) => {
      setUser({ ...user, [property]: value });
    };
  };

  const handleOk = () => {
    if (props.onSave) {
      props.onSave(user).then(setError);
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
                value={user.name}
                onValueChange={handleValueChange("name")}
                {...error?.["name"]}
              />
              <PrimaryInput defaultValue={user.email} isReadOnly={true} label="Email" placeholder="Input Email" />
              <PasswordInput
                label="New Password"
                placeholder="Input Password"
                value={user.password}
                onValueChange={handleValueChange("password")}
                {...error?.["password"]}
              />
              <Selection
                items={enumToKeyLabel(UserRole)}
                label="User Role"
                placeholder="Select Role"
                selectedKeys={[user.role]}
                onValueChange={handleValueChange("role")}
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
