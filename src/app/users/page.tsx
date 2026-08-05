import { Suspense } from "react";

import UserList from "n@/components/User/UserList";

export default function UsersPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading users...</p>}>
      <UserList />
    </Suspense>
  );
}
