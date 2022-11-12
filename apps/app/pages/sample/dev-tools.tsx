import { RequireAuth } from '@browser/auth';
import { DevToolsPage } from '@browser/sample';

function Impl() {
  return <DevToolsPage />;
}

export default function NextDevToolsPage() {
  return (
    <RequireAuth>
      <Impl />
    </RequireAuth>
  );
}
