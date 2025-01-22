import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer
      className={cn(
        "bg-white",
        "flex",
        "flex-col",
        "gap-4",
        "md:flex-row",
        "md:justify-between",
        "relative",
        "before:shadow",
        "before:inset-0",
        "before:absolute",
        "before:rotate-180",
        "before:pointer-events-none",
        "pl-2",
        "py-2",
      )}
    >
      <div className="flex flex-col gap-1 items-start">
        <p className="text-base">Quick links</p>
        <Button asChild variant="link">
          <Link href={bugReportMailLink}>Report a bug</Link>
        </Button>
        <Button asChild variant="link">
          <Link href={featureSuggestionMailLink}>Suggest a feature</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/tos">Terms of Service</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/privacy">Privacy policy</Link>
        </Button>
      </div>

      <div>
        <p className="text-base">Contact support</p>
        <Button asChild variant="link">
          <Link href="mailto:support@chronocademy.com">
            <Mail /> support@chronocademy.com
          </Link>
        </Button>
      </div>

      <Link href="/" className="h-16">
        <Image src={Logo} alt="chronocademy logo" className="h-full" />
      </Link>
    </footer>
  );
}

const bugReportMailLink = `mailto:info@chronocademy.com
?subject=Report a bug: [Brief bug description]
&body=${encodeURIComponent(
  `
*Please, try to fill in as much information as possible. You can use the template shown below and delete the instructions written between [brackets] to fill up your information.*

Dear Chronocademy Team,

I'd like to report a bug I encountered while using the platform. Here are the details:

Description of the bug: [Please provide a clear and concise description of the issue]

Steps to reproduce the bug:
1. [e.g., Go to...]
2. [e.g., Click on...]
3. [e.g., Scroll down to...]
4. [e.g., This error appears...]

Expected behavior:
[Describe what you expected to happen]

Actual behavior:
[Describe what actually happened]

Additional information:
- Browser: [e.g., Chrome, Firefox, Safari]
- Device: [e.g., Desktop, Mobile]
- Operating System: [e.g., Windows 10, macOS]

Screenshots:
[If possible, please attach screenshots to illustrate the issue]

Additional context:
[Any other relevant information about the bug]

Best regards,
[User's Name]

*Thank you for your attention to this matter, we appreciate you taking the time to help us improve.*
`.trim(),
)}`;

const featureSuggestionMailLink = `mailto:info@chronocademy.com
?subject=Suggest a feature: [Brief feature description]
&body=${encodeURIComponent(
  `
*Please, try to fill in as much information as possible. You can use the template shown below and delete the instructions written between [brackets] to fill up your information.*

Dear Chronocademy Team,

I have a feature suggestion that I believe would enhance the Chronocademy platform:

Feature description:
[Please provide a clear and detailed description of the suggested feature]

Problem it solves:
[Explain what problem this feature would solve or how it would improve the user experience]

Potential benefits:
[List the benefits this feature could bring to users and/or the platform]

Use case scenario:
[Describe a scenario where this feature would be particularly useful]

Similar features in other platforms (if any):
[If you've seen similar features elsewhere, please mention them here]

Additional context:
[Any other relevant information or ideas related to this feature]

Best regards,
[User's Name]

*Thank you for your attention to this matter, we appreciate you taking the time to help us improve.*
`.trim(),
)}`;
