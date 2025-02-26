import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { useEffect, useState } from "react";

import { PrimaryButton, SecondaryButton } from "@/components/theme/Button";
import { PrimaryInput } from "@/components/theme/Input";
import PasswordInput from "@/components/theme/PasswordInput";
import { Selection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { UserRole } from "@/services/user-role/model";
import { IUser } from "@/services/user/model";
import useValidationState from "@/components/hook/useValidationState";
import { extractModified } from "@/libraries/Transformer";

interface UserModalProps {
  user?: IUser;
  open: boolean;
  onOk: (user: IUser) => Promise<Record<string, string>>;
  onClose: () => void;
}

const defaultUser: IUser = {
  name: "",
  email: "",
  password: "",
  role: UserRole.Admin,
};

export default function UserModal(props: UserModalProps) {
  const [user, setUser] = useState(defaultUser);
  const [inputState, setInputState] = useValidationState();

  useEffect(() => {
    setUser(props.user ?? defaultUser);
  }, [props.user]);

  const handleChange = (name: keyof IUser) => {
    return (value: any) => {
      setUser({ ...user, [name]: value });
    };
  };

  const handleOk = async () => {
    const modifiedData = extractModified<IUser>(defaultUser, user, ["role"]);

    setInputState(await props.onOk(modifiedData));
  };

  return (
    <Modal backdrop="blur" isDismissable={false} isOpen={props.open} onOpenChange={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">{props.user ? "Edit User" : "New User"}</ModalHeader>
            <ModalBody>
              <PrimaryInput
                isRequired={!props.user}
                label="Name"
                placeholder="Input Name"
                value={user.name}
                onValueChange={handleChange("name")}
                {...inputState["name"]}
              />
              <PrimaryInput
                isReadOnly={!!props.user}
                isRequired={!props.user}
                label="Email"
                placeholder="Input Email"
                value={user.email}
                onValueChange={handleChange("email")}
                {...inputState["email"]}
              />
              <PasswordInput
                isRequired={!props.user}
                label="New Password"
                placeholder="Input Password"
                value={user.password}
                onValueChange={handleChange("password")}
                {...inputState["password"]}
              />
              <Selection
                items={enumToKeyLabel(UserRole)}
                label="User Role"
                placeholder="Select Role"
                selectedKeys={[user.role]}
                onValueChange={handleChange("role")}
                {...inputState["role"]}
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
