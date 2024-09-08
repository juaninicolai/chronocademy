import React, { ReactNode } from "react";
import Image from "next/image";

interface BoxProps {
  color: string;
  image: string;
  title: string;
  body: ReactNode;
}

const Box: React.FC<BoxProps> = ({ color, image, title, body }) => {
  return (
    <div
      className={`flex flex-col gap-3 p-12 px-11 flex-1 rounded-lg ${color} w-full max-w-sm`}
    >
      <div className={"flex items-center gap-3"}>
        <Image src={image} alt={title} width={40} height={40} />
        <p id={"box-title"} className={"text-xl font-bold"}>
          {title}
        </p>
      </div>
      <p id={"box-body"} className={"text-lg"}>
        {body}
      </p>
    </div>
  );
};

export default Box;
