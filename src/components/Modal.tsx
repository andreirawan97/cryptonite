import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as ModalRaw,
} from "@gluestack-ui/themed";
import { ReactElement, RefObject } from "react";
import { Text } from "react-native";

type Props = {
  ref?: RefObject<any>;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  BodyElement?: ReactElement;
  showCloseButton?: boolean;
};

export default function Modal(props: Props) {
  const { isOpen, ref, onClose, title, BodyElement, showCloseButton } = props;

  return (
    <ModalRaw isOpen={isOpen} onClose={onClose} finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        {title && (
          <ModalHeader>
            <Heading size="lg">{title}</Heading>
            {showCloseButton && (
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            )}
          </ModalHeader>
        )}
        <ModalBody>{BodyElement}</ModalBody>
      </ModalContent>
    </ModalRaw>
  );
}
