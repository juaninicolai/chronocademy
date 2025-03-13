import { db } from "@/app/database";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { notFound } from "next/navigation";

export default async function ProfileIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profileId = Number((await params).id);

  const profile = await db
    .selectFrom("users")
    .innerJoin("user_data", "user_data.user_id", "users.id")
    .select([
      "user_data.first_name",
      "user_data.last_name",
      "user_data.description",
      jsonArrayFrom(
        db
          .selectFrom("user_languages")
          .innerJoin("languages", "languages.id", "user_languages.language_id")
          .select((eb) => [
            "user_languages.language_id as id",
            "languages.language",
            eb.fn<string>("INITCAP", ["user_languages.level"]).as("level"),
            "user_languages.level",
          ])
          .where("user_languages.user_id", "=", profileId),
      ).as("languages"),
      jsonArrayFrom(
        db
          .selectFrom("user_skills")
          .innerJoin("skills", "skills.id", "user_skills.skill_id")
          .select([
            "user_skills.skill_id as id",
            "skills.skill",
            "user_skills.price",
          ])
          .where("user_skills.user_id", "=", profileId)
          .where("user_skills.type", "=", "teach"),
      ).as("teaching_skills"),
      jsonArrayFrom(
        db
          .selectFrom("user_skills")
          .innerJoin("skills", "skills.id", "user_skills.skill_id")
          .select(["user_skills.skill_id as id", "skills.skill"])
          .where("user_skills.user_id", "=", profileId)
          .where("user_skills.type", "=", "learn"),
      ).as("learning_skills"),
    ])
    .where("users.id", "=", profileId)
    .executeTakeFirst();

  if (profile === undefined) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/app/user/profile/picture/${profileId}`}
          alt=""
          className="size-48"
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-4">
            <p className="text-3xl">
              {profile.first_name} {profile.last_name}
            </p>
            <p className="text-base">Canada</p>
          </div>
          <p className="text-base">{profile.description}</p>
        </div>
      </div>

      {profile.languages.length > 0 && (
        <div>
          <p className="text-base">I speak:</p>
          <div className="flex flex-col ml-4 gap-2">
            {profile.languages.map((language) => (
              <div key={language.id} className="flex gap-2 items-stretch">
                <p className="text-base">{language.language}</p>
                <Badge variant="outline">{language.level}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.teaching_skills.length > 0 && (
        <div>
          <p className="text-base">I can teach:</p>
          <div className="flex flex-col ml-4 gap-2">
            {profile.teaching_skills.map((skill) => (
              <div key={skill.id} className="flex gap-2 items-stretch">
                <p className="text-base">{skill.skill}</p>
                {skill.price !== null && (
                  <>
                    <Separator orientation="vertical" className="h-auto" />
                    <p className="text-base font-black">{skill.price} €/h</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.learning_skills.length > 0 && (
        <div>
          <p className="text-base">I am interested in:</p>
          <div className="flex flex-col ml-4 gap-2">
            {profile.learning_skills.map((skill) => (
              <p key={skill.id} className="text-base">
                {skill.skill}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
