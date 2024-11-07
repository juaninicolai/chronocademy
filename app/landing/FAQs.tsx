export default function FAQs() {
  return (
    <div id={"faqs"} className={"px-6 sm:px-28"}>
      <h1
        className={
          "font-inter sm:text-4xl text-secondary-black-500 py-4 text-center font-extrabold"
        }
      >
        Frequently Asked Questions
      </h1>
      <div className={"font-roboto text-h3"}>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            What is Chronocademy?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            Chronocademy is an online platform that allows users to exchange
            skills using a time-based currency called Chrono. Users can earn
            Chronos by teaching skills they are proficient in and spend Chronos to
            learn new skills from others.
            <br />
            <br />
            Chronocademy addresses a critical gap in the education market by
            providing an accessible, flexible, and cost-effective way for people
            to learn and share knowledge. The platform&apos;s time-based
            currency ensures that everyone has an equal opportunity to teach and
            learn, regardless of their financial situation.
            <br />
            <br />
          </h4>
        </details>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            How do I get started?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            Once the beta version is released, you can sign up on our website,
            create your profile, and list the skills you can teach, and
            your learning interests. You will receive Chronos as a welcome
            bonus to get started right away. {/*If you were referred by a friend,
            include the referral code in the sign-up process so your friend can
            get the reward.*/}
            <br />
            <br />
            Until then, you can provide us with your name and email to join the 
            the waiting list. Then, we can keep you informed about the development 
            of the platform and get notified when the beta version is released.
            <br />
            <br />
          </h4>
        </details>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            How does the Chrono currency work?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            Users earn Chronos by teaching classes or offering their skills. They
            can then spend these earned Chronos to book classes and learn from
            other users. <span className="text-primary-blue-300"> Chronos can also 
            be purchased with money or converted to cash if desired. [Not in Beta] </span>
            <br />
            <br />
          </h4>
        </details>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            What skills can I learn or teach on Chronocademy?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            Chronocademy includes any kind of skill that can be taught online
            such as cooking, musical instrument instruction, fitness, art, and
            any other kind of academic skill. In addition, users can offer their
            knowledge and advice in daily tasks such as plumbing, painting,
            gardening, etc.
            <br />
            <br />
          </h4>
        </details>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            How do I schedule a class?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            Browse through the teacher profiles and select one that fits your needs. 
            Check their available time slots and pick one that works for you. 
            Once you submit your booking request, the teacher will review and either 
            accept or suggest an alternative.
            If the teacher cannot accommodate your chosen time, they may respond 
            with a suggested time for the class. You can review their suggestion 
            and decide if it works for you. 
            If the teacher declined the booking but didn’t suggest another time slot, 
            you can either try another time slot or check with another teacher.
            <br />
            <br />
          </h4>
        </details>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            How much does a class cost?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            The price of a class is set by the teacher and it will depend on
            different factors, such as experience, type of class, demand, or
            type of skill. If you book a class it means that you accept the 
            price set by the teacher.
            <br />
            <br />
          </h4>
        </details>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            Can I buy Chronos?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            <span className="text-primary-blue-300">Yes, users have the option 
            to purchase as many Chronos as they wish. [Not in Beta] </span>
            <br />
            <br />
          </h4>
        </details>
        <details className="py-4 cursor-pointer font-medium">
          <summary>
            Can I cash out my Chronos?
            <div
              className="mt-2 border-t shadow-sm"
              style={{
                borderColor: "gray",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </summary>
          <h4 className={"pt-4 font-normal text-lg"}>
            <span className="text-primary-blue-300">Yes, users have the option 
            to convert their earned Chronos to cash.
            However, the free Chronos given to new users and from the
            referral program cannot be cashed out to ensure the platform’s
            financial sustainability. [Not in Beta] </span>
            <br />
            <br />
          </h4>
        </details>
      </div>
    </div>
  );
}
