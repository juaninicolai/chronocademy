import fs from "node:fs/promises";

export default async function Privacy() {
  let privacyPolicy = "";
  let error = "";
  try {
    privacyPolicy = await fs.readFile("app/privacy/privacy.txt", "utf-8");
  } catch (err) {
    console.error(err);
    error = "Failed to load privacy policy.";
  }

  return (
    <>
      <div className={"py-4 px-28 text-justify whitespace-pre-wrap"}>
        {error ? <p>{error}</p> : <p>{privacyPolicy}</p>}
      </div>
    </>
  );
}
