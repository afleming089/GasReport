interface User {
  readonly email: string;
  readonly settings: { defaultRegion: string; defaultFuelType: string };
  readonly sessionToken: string;
}

export { User };
