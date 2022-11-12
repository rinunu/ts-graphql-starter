import { ErrorProps } from 'next/error';
import { NextPage } from 'next';
import { SentryErrorComponent } from '@browser/sentry';

const Error: NextPage<ErrorProps> = (props) => {
  return <SentryErrorComponent statusCode={props.statusCode} />;
};

export default Error;
