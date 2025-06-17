export const appConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://1rpapp.in/v1',
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || 'your-tenant-id',
  logger: {
    serverLogging: process.env.NODE_ENV === 'production',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'debug'
  },
  version:'1.0'
};