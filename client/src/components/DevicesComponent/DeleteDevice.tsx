import { FaTrash } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from "../Modal";
import { FC } from "react";
import { useParking } from "../../App";
import axios from "axios";

type DeleteDevice = {
  selectedDevice: Device | null;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  hideDeleteDevice: VoidFunction;
};

const DeleteDevice: FC<DeleteDevice> = ({
  selectedDevice,
  setDevices,
  hideDeleteDevice,
}): JSX.Element => {
  const { API_URL, showNotification } = useParking();

  const removeDevice = async (): Promise<void> => {
    if (selectedDevice) {
      await axios
        .delete(API_URL + "/removedevice/" + selectedDevice.device_id)
        .then((res) => {
          if (res.status >= 200 && res.status <= 226) {
            const { status, message } = res.data as ResponseStatus;

            if (status === "deleted") {
              setDevices((devices) =>
                devices.filter((d) => d.device_id !== selectedDevice.device_id)
              );
              hideDeleteDevice();
              showNotification(message, true);
            } else if (status === "delete_error") {
              showNotification(message, false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader title="ყურადღება!" onHide={hideDeleteDevice} />
        <ModalBody>
          <div className="w-[37.938rem]">
            <div className="w-[4.5rem] h-[4.5rem] rounded-3xl font-bold text-[53px] bg-button-red flex justify-center items-center mx-auto mt-5">
              <img
                src="./Delete.svg"
                alt="Delete"
                className="h-[2.063rem] w-[2.063rem]"
              />
            </div>
            <div className="text-xl leading-6 text-gray-primary text-center font-bold mt-[1.875rem] mb-8">
              ნამდვილად გსურთ მოწყობილობის წაშლა ?
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="w-[8rem] h-10 bg-button-red rounded-primary flex justify-between font-bold mx-auto text-white text-[1rem] leading-5 px-[1.688rem] py-[0.625rem] mb-[2.563rem]"
            onClick={removeDevice}
          >
            წაშლა <FaTrash />
          </button>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

export default DeleteDevice;
