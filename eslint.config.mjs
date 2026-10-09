// Minimal ESLint flat config. The Next.js recommended config requires the
// codemod migration on ESLint 9; keep linting lightweight here — type-check
// (tsc --noEmit) and production build are the authoritative checks.
export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
