import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { db } from "../database";
import { ProfileCardsGrid } from "./client";

export default async function HomePage() {
  const profiles = await db
    .selectFrom("users")
    .innerJoin("user_data", "user_data.user_id", "users.id")
    .selectAll()
    .execute();

  return (
    <div className="container mx-auto">
      <ProfileCardsGrid>
        {profiles
          .concat(profiles)
          .concat(profiles)
          .concat(profiles)
          .map((profile) => (
            <Card key={profile.id} className="w-full">
              <CardHeader>
                <CardTitle>
                  {profile.first_name} {profile.last_name}
                </CardTitle>
                <CardDescription>{profile.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          ))}
      </ProfileCardsGrid>
    </div>
  );
}
