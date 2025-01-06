import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { db } from "../database";
import { ProfileCardsGrid } from "./client";
import Image from "next/image";
import Avatar1 from "@/public/avatars/1.png";
import Avatar2 from "@/public/avatars/2.png";
import Avatar3 from "@/public/avatars/3.png";
import Avatar4 from "@/public/avatars/4.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import crypto from "crypto";

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];

// Returns the same random avatar consistently for the given ID.
function getAvatar(id: number) {
  const hash = crypto.createHash("sha256").update(id.toString()).digest("hex");
  const hashInt = BigInt(`0x${hash}`);
  const index = Number(hashInt % BigInt(4));
  return avatars[index];
}

export default async function HomePage() {
  const profiles = await db
    .selectFrom("users")
    .innerJoin("user_data", "user_data.user_id", "users.id")
    .selectAll()
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("user_languages")
          .innerJoin("languages", "languages.id", "user_languages.language_id")
          .select((eb) => [
            "languages.language",
            eb.fn<string>("INITCAP", ["user_languages.level"]).as("level"),
          ])
          .whereRef("user_languages.user_id", "=", "users.id")
          .limit(4),
      ).as("languages"),

      jsonArrayFrom(
        eb
          .selectFrom("user_skills")
          .innerJoin("skills", "skills.id", "user_skills.skill_id")
          .select("skills.skill")
          .whereRef("user_skills.user_id", "=", "users.id")
          .where("user_skills.type", "=", "teach")
          .limit(4),
      ).as("skills"),
    ])
    .execute();

  return (
    <div className="container mx-auto">
      <ProfileCardsGrid>
        {profiles
          .concat(profiles)
          .concat(profiles)
          .concat(profiles)
          .map((profile) => (
            <Card key={profile.id} className="rounded-xl">
              <div className="relative">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={getAvatar(profile.id)}
                    alt=""
                    className="rounded-t-xl w-full"
                  />
                </AspectRatio>
                <CardHeader className="absolute bottom-0">
                  <CardTitle>
                    {profile.first_name} {profile.last_name}
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="pt-6 space-y-2">
                <p>
                  Description: {profile.description.slice(0, 150).trimEnd()}
                  {profile.description.length > 150 && (
                    <>
                      {"... "}
                      <HoverCard>
                        <HoverCardTrigger className="underline">
                          Read more
                        </HoverCardTrigger>
                        <HoverCardContent className="w-96">
                          {profile.description}
                        </HoverCardContent>
                      </HoverCard>
                    </>
                  )}
                </p>
                <p>
                  Skills:{" "}
                  {profile.skills
                    .slice(0, 3)
                    .map(({ skill }) => skill)
                    .join(", ")}
                  {profile.skills.length > 3 && ", ..."}
                </p>
                <p>
                  Speaks:{" "}
                  {profile.languages
                    .slice(0, 3)
                    .map(({ language, level }) => `${language} (${level})`)
                    .join(", ")}
                  {profile.languages.length > 3 && ", ..."}
                </p>
              </CardContent>
            </Card>
          ))}
      </ProfileCardsGrid>
    </div>
  );
}
