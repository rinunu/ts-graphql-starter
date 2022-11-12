import { UserDetailPage } from '@browser/sample';
import { useRouter } from 'next/router';
import { Layout, RouterReady } from '@browser/common-components';
import { RequireAuth } from '@browser/auth';

export default function NextUserDetailPage() {
  return (
    <RouterReady>
      <Impl />
    </RouterReady>
  );
}

function Impl() {
  const { query } = useRouter();
  const { id } = query as { id: string };

  return (
    <RequireAuth>
      <Layout>
        <UserDetailPage userId={id} />
      </Layout>
    </RequireAuth>
  );
}
