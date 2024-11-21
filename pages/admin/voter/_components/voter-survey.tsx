import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useEffect, useState } from "react";

import { PrimaryButton, SecondaryButton } from "@/components/theme/Button";
import { KeyLabel } from "@/libraries/EnumUtil";
import { VoterDto } from "@/services/voter/model";
import { CandidateSimpleDto } from "@/services/candidate/model";
import useApiRequest from "@/components/hook/useApiRequest";
import { RadioSelect } from "@/components/theme/Selection";
import { ISurvey } from "@/services/survey/model";

interface SurveyModalProps {
  voter?: VoterDto;
  position: Array<KeyLabel>;
  open: boolean;
  onOk: (survey: Array<ISurvey>) => Promise<Record<string, string> | void>;
  onClose: () => void;
}

export default function SurveyModal(props: SurveyModalProps) {
  const api = useApiRequest();
  const [candidates, setCandidates] = useState<Record<string, CandidateSimpleDto[]>>({});

  useEffect(() => {
    if (props.open) {
      for (const position of props.position) {
        loadCandidates(position.key);
      }
    } else {
      setCandidates({});
    }
  }, [props.open]);

  const loadCandidates = async (position: string) => {
    const result = await api<CandidateSimpleDto[]>("list-candidate-simple", { position });

    if (result.status === "success" && result.data) {
      for (const candidate of result.data) {
        if (candidates[position]) {
          setCandidates({ ...candidates, [position]: [...candidates[position], candidate] });
        } else {
          setCandidates({ ...candidates, [position]: [candidate] });
        }
      }
    }
  };

  const handleOk = async () => {};

  return (
    <Modal backdrop="blur" isDismissable={false} isOpen={props.open} onOpenChange={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">Survey {props.voter?.name}</ModalHeader>
            <ModalBody>
              {Object.keys(candidates).map((position, index) => (
                <RadioSelect
                  key={index}
                  items={candidates[position].map((candidate) => ({
                    key: candidate.candidateId,
                    label: candidate.name,
                  }))}
                  label={props.position.find((pp) => pp.key === position)?.label}
                />
              ))}
            </ModalBody>
            <ModalFooter className="flex flex-row justify-evenly">
              <SecondaryButton fullWidth onPress={onClose}>
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onPress={handleOk}>
                Done
              </PrimaryButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
