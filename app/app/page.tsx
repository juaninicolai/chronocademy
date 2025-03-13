import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { db } from "../database";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sql } from "kysely";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query?.trim();

  const profiles = await db
    .with("profiles_raw", (db) => {
      let cte = db
        .selectFrom("users")
        .innerJoin("user_data", "user_data.user_id", "users.id")
        .innerJoin("user_languages", "user_languages.user_id", "users.id")
        .innerJoin("languages", "languages.id", "user_languages.language_id")
        .innerJoin("user_skills", "user_skills.user_id", "users.id")
        .innerJoin("skills", "skills.id", "user_skills.skill_id")
        .select([
          "users.id",
          "user_data.first_name",
          "user_data.last_name",
          "user_data.description",
          "languages.language",
          "user_languages.level",
          "skills.skill",
        ])
        .where("user_skills.type", "=", "teach");

      if (query !== undefined && query !== "") {
        cte = cte.where((eb) =>
          eb.or([
            eb(
              "user_data.tsv",
              "@@",
              // @ts-expect-error because Kysely is being a PITA and doesn't seem to support combining with AND or OR using raw SQL
              eb.val(sql`websearch_to_tsquery('english', ${query})`),
            ),
            eb(
              "languages.tsv",
              "@@",
              // @ts-expect-error because Kysely is being a PITA and doesn't seem to support combining with AND or OR using raw SQL
              eb.val(sql`websearch_to_tsquery('english', ${query})`),
            ),
            eb(
              "skills.tsv",
              "@@",
              // @ts-expect-error because Kysely is being a PITA and doesn't seem to support combining with AND or OR using raw SQL
              eb.val(sql`websearch_to_tsquery('english', ${query})`),
            ),
          ]),
        );
      }

      return cte;
    })
    .with("profiles_distinct", (db) =>
      db
        .selectFrom("profiles_raw")
        .select(["id", "first_name", "last_name", "description"])
        .distinct(),
    )
    .selectFrom("profiles_distinct")
    .selectAll()
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("profiles_raw")
          .select((eb) => [
            "language",
            eb.fn<string>("INITCAP", ["level"]).as("level"),
          ])
          .distinct()
          .whereRef("profiles_raw.id", "=", "profiles_distinct.id"),
      ).as("languages"),
      jsonArrayFrom(
        eb
          .selectFrom("profiles_raw")
          .select(["skill"])
          .distinct()
          .whereRef("profiles_raw.id", "=", "profiles_distinct.id"),
      ).as("skills"),
    ])
    .execute();

  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-between">
      <div className="w-full max-w-screen-md">
        <form className="flex gap-1">
          <Input
            name="query"
            defaultValue={query}
            className="bg-white"
            type="text"
            placeholder="Search for a profile"
          />
          <Button type="submit" className="flex-shrink-0" size="icon">
            <Search />
          </Button>
        </form>
      </div>

      <div
        className={cn(
          "grid",
          "gap-4",
          "grid-cols-1",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "xl:grid-cols-4",
          "2xl:grid-cols-5",
        )}
      >
        {profiles.map((profile) => (
          <Card key={profile.id} className="rounded-xl size-full">
            <Link href={`/app/profile/${profile.id}`}>
              <div className="relative">
                <AspectRatio ratio={1 / 1}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/app/user/profile/picture/${profile.id}`}
                    // TODO: Investigate how to do this better
                    alt=""
                    className="rounded-t-xl w-full"
                  />
                </AspectRatio>
                <CardHeader className="absolute inset-0 top-auto">
                  <CardTitle className="text-center text-white mix-blend-difference">
                    {profile.first_name} {profile.last_name}
                  </CardTitle>
                </CardHeader>
              </div>
            </Link>
            <CardContent className="pt-6 space-y-2">
              {profile.description.length > 0 && (
                <p>
                  Description: {profile.description.slice(0, 150).trimEnd()}
                  {profile.description.length > 150 && (
                    <>
                      {"... "}
                      <Dialog>
                        <DialogTrigger className="underline">
                          Read more
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="hidden">
                              {`${profile.first_name} ${profile.last_name}'s description`}
                            </DialogTitle>
                            <DialogDescription>
                              {profile.description}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </p>
              )}

              {profile.skills.length > 0 && (
                <p>
                  Skills:{" "}
                  {profile.skills
                    .slice(0, 3)
                    .map(({ skill }) => skill)
                    .join(", ")}
                  {profile.skills.length > 3 && (
                    <>
                      {", ... "}
                      <Dialog>
                        <DialogTrigger className="underline">
                          See more
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="hidden">
                              {`${profile.first_name} ${profile.last_name}'s skills`}
                            </DialogTitle>
                            <DialogDescription>
                              {profile.skills
                                .map(({ skill }) => skill)
                                .join(", ")}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </p>
              )}

              {profile.languages.length > 0 && (
                <p>
                  Speaks:{" "}
                  {profile.languages
                    .slice(0, 3)
                    .map(({ language, level }) => `${language} (${level})`)
                    .join(", ")}
                  {profile.languages.length > 3 && (
                    <>
                      {", ... "}
                      <Dialog>
                        <DialogTrigger className="underline">
                          See more
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="hidden">
                              {`${profile.first_name} ${profile.last_name}'s languages`}
                            </DialogTitle>
                            <DialogDescription>
                              {profile.languages
                                .map(
                                  ({ language, level }) =>
                                    `${language} (${level})`,
                                )
                                .join(", ")}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Book a class with a teacher</AccordionTrigger>
              <AccordionContent>
                Browse through the teacher profiles and select one that fits
                your needs. Check their available time slots and pick one that
                works for you. Once you submit your booking request, the teacher
                will review and either accept or suggest an alternative.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                My booking request was declined
              </AccordionTrigger>
              <AccordionContent>
                If the teacher cannot accommodate your chosen time, they may
                respond with a suggested time for the class. You can review
                their suggestion and decide if it works for you. If the teacher
                declined the booking but didn’t suggest another timeslot, you
                can either try another timeslot or check with another teacher.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="foo">
                See a teacher{"`"}s availability before booking
              </AccordionTrigger>
              <AccordionContent>
                Each teacher’s profile shows their available time slots, so you
                can choose a time that fits both of you before submitting a
                booking request.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
