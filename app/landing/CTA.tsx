import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <div className={"space-y-2"}>
      <h3>Join the waiting list to be an early adopter!</h3>
      <div className={"flex space-x-2"}>
        <input
          className={"p-4 rounded-lg"}
          type={"text"}
          placeholder={"Enter your name"}
        />
        <input
          className={"p-4 rounded-lg"}
          type={"email"}
          placeholder={"Enter your email"}
        />
        <button
          className={
            "bg-primary-blue-500 text-secondary-white-500 font-roboto text-xl p-4 rounded-lg flex items-center space-x-2"
          }
        >
          Join the waiting list <FaArrowRight className={"ml-2"} />
        </button>
      </div>
      <div className={"flex"}>
        <p id={"info-disclaimer"}>Your information is safe with us.</p>
      </div>
    </div>
  );
}
