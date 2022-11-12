import { PostListPage } from '@browser/sample';
import { Layout } from '@browser/common-components';
import { RequireAuth } from '@browser/auth';

export default function NextPostListPage() {
  return (
    <RequireAuth>
      <Layout>
        <PostListPage />
      </Layout>
    </RequireAuth>
  );
}
