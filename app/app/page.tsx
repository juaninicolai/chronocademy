import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { db } from "../database";
import { ProfileCardsGrid } from "./client";
import Image from "next/image";
import personPic from "@/public/person_pic.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { jsonArrayFrom } from "kysely/helpers/postgres";

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
                  <Image src={personPic} alt="" className="rounded-t-xl" />
                </AspectRatio>
                <CardHeader className="absolute bottom-0">
                  <CardTitle>
                    {profile.first_name} {profile.last_name}
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="pt-6">
                <p>Description: {profile.description}</p>
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
