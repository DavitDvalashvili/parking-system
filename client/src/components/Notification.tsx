import { useEffect } from "react";
import { useParking } from "../App";
import { Modal, ModalBody, ModalContainer, ModalHeader } from "./Modal";

const Notification = (): JSX.Element => {
  const { notiFicationMessage, hideNotification, notiFicationSuccess } =
    useParking();

  useEffect(() => {
    setTimeout(() => {
      hideNotification();
    }, 5000);
  }, []);

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader onClick={hideNotification} />
        <ModalBody>
          <div className="w-[37.938rem]">
            <div
              className={`text-xl leading-6 text-text-gray-primary text-center font-bold mt-[1.875rem] mb-8 `}
            >
              {notiFicationMessage}
              {notiFicationSuccess}
            </div>
            {notiFicationSuccess && (
              <div className="flex justify-center items-center mb-[5.313rem] ">
                <img
                  src="/success.svg"
                  alt="success"
                  className="h-[6.563rem] w-[6.563rem]"
                />
              </div>
            )}
            {!notiFicationSuccess && (
              <div className=" flex justify-center items-center mb-[5.313rem]">
                <img
                  src="/fail.svg"
                  alt="fail"
                  className="h-[6.25rem] w-[6.25rem]"
                />
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </ModalContainer>
  );
};

export default Notification;
