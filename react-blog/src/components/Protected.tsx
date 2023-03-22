import { usePocket } from "./PocketContext";

export const Protected = () => {
  const { logout, user } = usePocket();

  return (
    <section>
      <h2>Protected</h2>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <button onClick={logout} />
    </section>
  );
};
