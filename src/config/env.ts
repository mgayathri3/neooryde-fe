interface EnvConfig {
  apiUrl: string;
  appEnv: string;
  logLevel: string;
  enableMockApi: boolean;
}

export const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  appEnv: import.meta.env.VITE_APP_ENV,
  logLevel: import.meta.env.VITE_LOG_LEVEL,
  enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
};
