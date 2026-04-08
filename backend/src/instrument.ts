import * as Sentry from '@sentry/node';

import { config } from './config/unifiedConfig';

Sentry.init({
  dsn: config.observability.sentryDsn || undefined,
  enabled: Boolean(config.observability.sentryDsn),
  environment: config.env,
  tracesSampleRate: 1,
});

export { Sentry };
