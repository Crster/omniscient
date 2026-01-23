import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { userPageContext } from "@/contexts/user";
import { useFormState } from "@/utils/form-state";

export default function AddUserModal() {
  const { addUserModal } = userPageContext.Consumer();
  const form = useFormState({
    email: "",
    name: "",
    role: "user",
  });

  return (
    <Modal hideCloseButton isOpen={addUserModal.isOpen} onOpenChange={addUserModal.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">New User</ModalHeader>
            <ModalBody>
              <Input
                label="Email"
                placeholder="Enter email"
                value={form.get("email")}
                onValueChange={form.set("email")}
              />
              <Input label="Name" placeholder="Enter name" value={form.get("name")} onValueChange={form.set("name")} />
              <Select label="Role" value={[form.get("role")]} onSelectionChange={([val]) => form.set("role")(val)}>
                <SelectItem key="admin">Admin</SelectItem>
                <SelectItem key="survivor">Survivor</SelectItem>
                <SelectItem key="user">User</SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
