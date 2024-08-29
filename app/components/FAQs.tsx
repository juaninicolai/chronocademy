export default function FAQs() {
    return (
        <div className={"px-28"}>
            <h1 className={"font-inter text-4xl text-secondary-black-500 py-4 text-center font-extrabold"}>
                Frequently Asked Questions
            </h1>
            <div className={"font-roboto text-h3"}>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>What is Chronocademy? 
                         <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>
                        Chronocademy is an online platform that allows users to exchange skills using a time-based
                        currency called Chrono. Users can earn Chrono by teaching skills they are proficient in and spend Chrono
                        to learn new skills from others.<br/><br/>
                        Chronocademy addresses a critical gap in the education market by providing an accessible,
                        flexible, and cost-effective way for people to learn and share knowledge. The platform's time-based
                        currency ensures that everyone has an equal opportunity to teach and learn, regardless of their
                        financial situation.<br/><br/>
                    </h4>
                </details>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>How does the Chrono currency work?
                        <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>Users earn Chrono by teaching classes or offering their skills. They can then spend these earned
                        Chrono to book classes and learn from other users. Chrono can also be purchased with money or converted
                        to cash if desired.<br/><br/>
                    </h4>
                </details>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>What skills can I learn or teach on Chronocademy?
                        <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>
                        Chronocademy includes any kind of skill that can be taught online such as cooking, musical
                        instrument instruction, fitness, art, and any other kind of academic skill. In addition, users
                        can offer their knowledge and advice in daily tasks such as plumbing, painting, gardening, etc.<br/><br/>
                    </h4>
                </details>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>Can I buy Chrono?
                        <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>
                        Yes, users have the option to purchase as many Chronos as they wish.<br/><br/>
                    </h4>
                </details>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>Can I cash out my Chrono?
                        <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>
                        Yes, users have the option to convert their earned Chronos to cash. However, the free Chrono
                        tokens given to new users and from the referral program cannot be cashed out to ensure the platform’s
                        financial sustainability.<br/><br/>
                    </h4>
                </details>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>How do I schedule a class?
                        <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>
                        Classes can be scheduled through our integrated calendar or through the platform chat when
                        getting an agreement with the other user.<br/><br/>
                    </h4>
                </details>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>How much does a class cost?
                        <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>
                        The price of a class is set by the teacher and it will depend on different factors, such as
                        experience, type of class, demand, or type of skill. The price can be negotiated with the tutor
                        only through the platform chat. If a class is booked directly through the calendar, the price will be
                        the one set by default by the teacher.<br/><br/>
                    </h4>
                </details>
                <details className="py-4 cursor-pointer font-medium">
                    <summary>How do I get started?
                        <div
                            className="mt-2 border-t shadow-sm"
                            style={{ borderColor: 'gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                        />
                    </summary>
                    <h4 className={"pt-4 font-normal text-lg"}>
                        Once the beta version is released, you can sign up on our website, create your profile, and list
                        the skills you can teach, if any, and your learning interests. You will receive two Chronos as a
                        welcome bonus to get started right away. If you were referred by a friend, include the referral code in
                        the sign-up process so your friend can get the reward.<br/><br/>
                        Until then, you can write here your name and email, so we can keep you informed about the
                        development of the platform and get notified when the beta version is released.<br/><br/>
                    </h4>
                </details>
            </div>
        </div>
    );
}