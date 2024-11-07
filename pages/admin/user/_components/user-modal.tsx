import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useEffect, useState } from "react";

import { PrimaryButton, SecondaryButton } from "@/components/theme/Button";
import { PrimaryInput } from "@/components/theme/Input";
import PasswordInput from "@/components/theme/PasswordInput";
import { Selection } from "@/components/theme/Selection";
import { enumToKeyLabel } from "@/libraries/EnumUtil";
import { UserRole } from "@/services/user-role/model";
import { IUser } from "@/services/user/model";
import useValidationState from "@/components/hook/useValidationState";

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
    const defaultValue = props.user ?? defaultUser;
    const updateValue = new Map<string, any>();

    if (defaultValue.email !== user.email) updateValue.set("email", user.email);
    if (defaultValue.name !== user.name) updateValue.set("name", user.name);
    if (defaultValue.password !== user.password) updateValue.set("password", user.password);
    if (defaultValue.role !== user.role) {
      updateValue.set("role", user.role);
    } else if (!props.user) {
      updateValue.set("role", user.role || defaultValue.role);
    }

    setInputState(await props.onOk(Object.fromEntries(updateValue) as IUser));
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
