declare global {
  interface Window {
    requirejs: (
      bumpVersion: string[],
      callback: (Bump: BumpType) => void,
    ) => void;
    mediaPlayers: Record<string, Player>;
    dotcom: {
      ads: {
        getAdTag: () => Promise<string>;
        resolves: { enabled: Promise[]; getAdTag: Promise[] };
      };
      bootstrap: () => void;
      cmd: { push: () => void };
    };
  }
}

export {};
