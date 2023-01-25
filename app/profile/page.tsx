import { getUser } from '@lib/auth';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>;
  }

  return (
    <main>
      Name: {user.name}
      <br />
      Email: {user.email}
    </main>
  );
}
