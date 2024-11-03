import fs from "node:fs/promises";

export default async function TOS() {
  let termsOfService = "";
  let error = "";
  try {
    termsOfService = await fs.readFile("app/tos/tos.txt", "utf-8");
  } catch (err) {
    console.error(err);
    error = "Failed to load terms of service.";
  }

  return (
    <>
      <div className={"py-4 px-28 text-justify whitespace-pre-wrap"}>
        {error ? <p>{error}</p> : <p>{termsOfService}</p>}
      </div>
    </>
  );
}
