type Props = {
  permissions: undefined | string[];
};

export function Content({ permissions }: Props) {
  if (permissions === undefined) {
    return null;
  }
  return permissions.includes("admin") ? (
    <p className="mt-4 text-l text-center">Admin stuff...</p>
  ) : (
    <p className="mt-4 text-l text-center">
      Cleverly done, Mr. Freeman, but you're not supposed to be here. As a
      matter of fact, you're not. Get back where you belong, and forget about
      all this, until we meet again.
    </p>
  );
}
