import { db } from "@/app/database";
import UserDetailsPageClient from "./user-details";

type UserDetailsType = {
    countries: string[];
    timezones: string[];
    languages: [{
        language: string;
        level: string;
    }];
}

export default async function UserDetailsPage() {
    //TODO: need to run a migration to add these
    const countries = await db
        .selectFrom("countries")
        .select("*")
        .execute();

    const timezones = await db
        .selectFrom("timezones")
        .select("*")
        .execute();

    const languages = await db
        .selectFrom("languages")
        .select("*")
        .execute();

    //scaffold languages array
    // const availableLanguages = languages.reduce<Map<string, typeof languages>>(
    //     (acc,
    //     language) => {
    //         const languages = acc.get(language.language) ?? [];
    //         languages.push(language);
    //         acc.set(language.language, languages);
    //         return acc;
    //     }, new Map(),
    // );

    //TODO: need to pass props here
    return <UserDetailsPageClient />
}