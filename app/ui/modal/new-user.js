"use client";

import { MdOutlineAdd } from "react-icons/md";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";

export default function NewUserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="text-white bg-blue-500 rounded-lg px-2 py-2 w-32 justify-self-end"
        onPress={onOpen}
      >
        <MdOutlineAdd className="inline text-2xl align-top text-white" />
        Add User
      </Button>

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
                <Input classNames={{ label: "text-black", input: "text-black placeholder:text-gray-400" }} color="primary" labelPlacement="outside" label="Name" placeholder="Input Name"/>
                <Input classNames={{ label: "text-black", input: "text-black placeholder:text-gray-400" }} color="primary" labelPlacement="outside" label="Barangay" placeholder="Input Barangay"/>
                <Input classNames={{ label: "text-black", input: "text-black placeholder:text-gray-400" }} color="primary" labelPlacement="outside" label="New Password" placeholder="Input Password" type="password"/>
                <Input classNames={{ label: "text-black", input: "text-black placeholder:text-gray-400" }} color="primary" labelPlacement="outside" label="User Role" placeholder="Input Role"/>
              </ModalBody>
              <ModalFooter className="flex flex-row justify-evenly">
                <Button className="rounded-lg text-base" color="default" fullWidth onPress={onClose}>
                  No
                </Button>
                <Button className="rounded-lg text-base" color="primary" fullWidth onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
