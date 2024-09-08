import Image from "next/image";

const ListItem = ({
  src,
  alt,
  text,
}: {
  src: string;
  alt: string;
  text: string;
}) => (
  <li className={"flex flex-col items-center"}>
    <Image src={src} alt={alt} width={64} height={64} />
    {text}
  </li>
);

export default ListItem;
