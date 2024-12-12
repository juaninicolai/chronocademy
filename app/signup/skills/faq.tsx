import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div>
      <div>
        <h2 className="font-inter text-secondary-black-500 font-extrabold">
          Frequently Asked Questions
        </h2>
        <h3 className="font-roboto text-h3 py-4">
          Get the answers to your questions straight away
        </h3>
      </div>
      <div>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              Can I update my skills later?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely! You can edit or add skills anytime after sign-up to
              keep your profile up-to-date as you gain more experience or new
              interests.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              How detailed should my skill descriptions be?
            </AccordionTrigger>
            <AccordionContent>
              Aim to provide a concise but informative description. For example,
              instead of just &#34;Math,&#34; specify &#34;Algebra and Calculus
              for for high school students&#34; or instead of just “Spanish”
              specify &#34;Beginner&#39;s conversational Spanish.&#34;
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              Can I list multiple skills I want to learn or teach?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can add as many skills as you’d like to both lists. This
              helps match you with a wider range of potential learners or
              teachers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold">
              What if I’m unsure about my teaching qualifications?
            </AccordionTrigger>
            <AccordionContent>
              If you{"'"}re not formally certified but have experience (e.g.,
              tutoring or personal study), mention that in your description. If
              you have formal education or certification, listing it under
              Education adds credibility.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-bold">
              How do I get Chronos to learn if I don’t have anything to teach?
            </AccordionTrigger>
            <AccordionContent>
              At first you can use the welcome Chronos given to you, but then,
              for the beta version, you will have to give some classes to earn
              Chronos. It doesn’t need to be something academic or of high
              degree, it can be anything you are good at. After the beta
              version, payment methods will be introduced to purchase Chronos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="font-bold">
              I can’t find the teaching or learning category I want to add.
            </AccordionTrigger>
            <AccordionContent>
              Send us an email to info@chronocademy.com with the subject
              “category” and, in the message, specify which category you would
              like us to add. We’ll then send you a confirmation email when it’s
              been updated and you can add it from your profile.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
