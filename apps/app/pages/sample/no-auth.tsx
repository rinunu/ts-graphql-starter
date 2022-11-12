import { NoAuthPage } from '@browser/sample';
import { NoAuthLayout } from '@browser/common-components';

export default function NextNoAuthPage() {
  return (
    <NoAuthLayout>
      <NoAuthPage />
    </NoAuthLayout>
  );
}
