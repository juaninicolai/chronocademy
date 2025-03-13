export default async function ProfileIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <>{(await params).id}</>;
}
