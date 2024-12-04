import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { Props, tailwindProps } from "../interfaces";

export const ModalContainer = (props: Props): JSX.Element => {
  return (
    <div
      {...props}
      className={`w-screen h-screen flex justify-center items-center bg-slate-800/[.4] absolute left-0 top-0 transition-colors ${props.className} z-[9999]`}
    >
      {props.children}
    </div>
  );
};

export const Modal: React.FC<tailwindProps> = ({
  size = "fit",
  bg = "bg-white",
  color,
  ...props
}): JSX.Element => {
  return (
    <div
      {...props}
      className={`${size} ${bg} ${color} p-5 rounded-[1.25rem] ${props.className} `}
    >
      {props.children}
    </div>
  );
};

interface modalHeaderTypes extends Props {
  title?: string;
  onHide?: VoidFunction;
  closeButton?: boolean;
}
export const ModalHeader: React.FC<modalHeaderTypes> = ({
  onHide,
  closeButton = true,
  ...props
}): JSX.Element => {
  return (
    <div {...props} className={`${props.className}`}>
      {closeButton && (
        <>
          {props.children}
          <ImCancelCircle
            className="w-5 h-5 text-gray-primary cursor-pointer ml-auto "
            onClick={onHide}
          />
        </>
      )}
    </div>
  );
};

export const ModalBody = (props: Props): JSX.Element => {
  return <div {...props} className={` ${props.className}`}></div>;
};

export const ModalFooter = (props: Props): JSX.Element => {
  return (
    <div {...props} className={` ${props.className}`}>
      {props.children}
    </div>
  );
};
