export interface LocalTtsStrategy {
  getInstallStatus: (
    voice: string,
  ) => Promise<{ supported: boolean; installed: boolean }>;
  install: (params: {
    voice: string;
    onProgress?: (progress: number) => void;
  }) => Promise<void>;
  synthesize: (params: { text: string; voice: string }) => Promise<string>;
}
