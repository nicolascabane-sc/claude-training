// Credentials come from the environment: .env locally (see .env.example),
// repository secrets in CI. They are never stored in the repo.
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  return value;
}

export const standardUser = {
  username: requireEnv('SAUCE_USERNAME'),
  password: requireEnv('SAUCE_PASSWORD'),
};
