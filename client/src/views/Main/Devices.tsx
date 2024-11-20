import { PiDeviceMobileSpeakerFill } from "react-icons/pi";
import DeviceCard from "../../components/DevicesComponent/DeviceCard";
import AddNewDevice from "../../components/DevicesComponent/AddNewDevice";
import { ChangeEvent, useEffect, useState } from "react";
import EditDevice from "../../components/DevicesComponent/EditDevice";
import DeleteDevice from "../../components/DevicesComponent/DeleteDevice";
import { useParking } from "../../App";
import axios, { AxiosResponse } from "axios";
import FitCounter from "../../components/DevicesComponent/DeviceCardComponents/FitCounter";
import { HiOutlinePlusSm } from "react-icons/hi";

type DeviceTypeTypes = "card-receiver" | "card-giver";

export type DeviceType = {
  devicetype_id: number;
  devicetype_name: string;
  devicetype_type: DeviceTypeTypes;
};

const defaultDevice: Device = {
  device_id: 0,
  counter_id: 0,
  external_device_id: "",
  device_name: "",
  device_subsidiary_money_amount: "",
  device_cards_received_quantity: "",
  device_cards_to_give_quantity: "",
  device_cards_busy_quantity: "",
  device_cards_problematic_quantity: "",
  has_subsidiary_money_receiver: false,
  has_cash_receiver: false,
  has_debit_card_transaction: false,
  has_monitor: false,
  device_type: {
    devicetype_id: 0,
    devicetype_name: "",
    devicetype_type: "card-receiver",
  },
  client_mode: 0,
  employee_mode: 0,
};

type SwitchType = {
  device_id: number;
  external_device_id: number | string;
  client_mode: number | string;
  employee_mode: number | string;
};

const Devices = (): JSX.Element => {
  const { API_URL, showNotification } = useParking();

  const [isNewDeviceAdding, setIsNewDeviceAdding] = useState<boolean>(false);
  const [isDeviceEditing, setIsDeviceEditing] = useState<boolean>(false);
  const [isDeviceDeleting, setIsDeviceDeleting] = useState<boolean>(false);
  const [isDeviceFit, setIsDeviceFit] = useState<boolean>(false);

  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device>(defaultDevice);

  const getDeviceTypes = async (): Promise<void> => {
    await axios
      .get(API_URL + "/devicetypes")
      .then((res: AxiosResponse) => {
        if (res.status >= 200 && res.status <= 226) {
          setDeviceTypes(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDevices = async (): Promise<void> => {
    await axios
      .get(API_URL + "/devices")
      .then((res) => {
        if (res.status >= 200 && res.status <= 226) {
          setDevices(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showAddNewDevice = (): void => {
    setIsNewDeviceAdding(true);
  };
  const hideAddNewDevice = (): void => {
    setIsNewDeviceAdding(false);
  };

  const showEditDevice = (device: Device): void => {
    setSelectedDevice(device);
    setIsDeviceEditing(true);
  };
  const hideEditDevice = (): void => {
    setSelectedDevice(defaultDevice);
    setIsDeviceEditing(false);
  };

  const showDeleteDevice = (device: Device): void => {
    setSelectedDevice(device);
    setIsDeviceDeleting(true);
  };
  const hideDeleteDevice = (): void => {
    setSelectedDevice(defaultDevice);
    setIsDeviceDeleting(false);
  };

  const switchDevice = async (
    e: ChangeEvent<HTMLInputElement>,
    device: Device
  ): Promise<void> => {
    if (device.device_id) {
      const deviceSwitch: SwitchType = {
        device_id: device.device_id,
        external_device_id: device.external_device_id,
        client_mode: device.client_mode,
        employee_mode: device.employee_mode,
        [e.target.name]: e.target.value,
      };

      const isSelected: number | string = e.target.value;
      const targetName: string = e.target.name;

      await axios
        .post(API_URL + "/switchdevice", { ...deviceSwitch })
        .then((res) => {
          if (res.status >= 200 && res.status <= 226) {
            if (res.data) {
              setDevices((devices: Device[]) => {
                return devices.map((d) => {
                  return d.device_id === device.device_id
                    ? { ...d, [targetName]: isSelected }
                    : d;
                });
              });
            } else {
              showNotification("ცვლილება ვერ განხორციელდა", "bg-red-500");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showFitDevice = (device: Device) => {
    setSelectedDevice(device);
    setIsDeviceFit(true);
  };
  const hideFitDevice = () => {
    setSelectedDevice(defaultDevice);
    setIsDeviceFit(false);
  };

  useEffect(() => {
    getDeviceTypes();
    getDevices();
  }, []);

  return (
    <div className="p-10 flex flex-col flex-1 gap-y-10 overflow-v">
      <div className=" flex gap-[1.875rem] font-bold text-xl leading-normal">
        <div className="bg-white pt-[0.625rem] pb-[0.563rem] px-[0.875rem] flex justify-center items-center gap-5 rounded-[0.625rem] text-text-gray-primary w-[17.125rem]">
          <PiDeviceMobileSpeakerFill className="w-[1.875rem] h-[1.875rem]" />
          <span>მოწყობილობები</span>
        </div>
        <div className="bg-white px-[0.875rem] py-3 flex justify-center items-center gap-[0.625rem] rounded-[0.625rem] text-text-gray-primary text-base w-[18.813rem]">
          <span>მოწყობილობის დამატება</span>
          <HiOutlinePlusSm
            className="w-[1.563rem] h-[1.563rem] cursor-pointer"
            onClick={showAddNewDevice}
          />
        </div>
      </div>
      <div className="flex gap-10 flex-wrap">
        {devices.map((device: Device, i: number) => {
          return (
            <DeviceCard
              key={i}
              device={device}
              switchDevice={switchDevice}
              index={i}
              showEditDevice={showEditDevice}
              showDeleteDevice={showDeleteDevice}
              showFitDevice={showFitDevice}
            />
          );
        })}
      </div>
      {isNewDeviceAdding && (
        <AddNewDevice
          deviceTypes={deviceTypes}
          setDevices={setDevices}
          hideAddNewDevice={hideAddNewDevice}
        />
      )}
      {isDeviceEditing && (
        <EditDevice
          selectedDevice={selectedDevice}
          setDevices={setDevices}
          hideEditDevice={hideEditDevice}
        />
      )}
      {isDeviceDeleting && (
        <DeleteDevice
          selectedDevice={selectedDevice}
          setDevices={setDevices}
          hideDeleteDevice={hideDeleteDevice}
        />
      )}
      {isDeviceFit && (
        <FitCounter
          selectedDevice={selectedDevice}
          setDevices={setDevices}
          hideFitDevice={hideFitDevice}
        />
      )}
    </div>
  );
};

export default Devices;
