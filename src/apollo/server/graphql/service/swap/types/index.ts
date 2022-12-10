export type GlobalProps = {
  customize: {
    font: {
      color: string;
    };
    background: {
      color: string;
    };
  };
};

export type ContextRoot = {
  spotifyAPIToken: () => Promise<string>;
  req: unknown;
};
