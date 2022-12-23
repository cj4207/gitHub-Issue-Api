import { Octokit } from "octokit"
export const shared = {
  badgeBg: {
    'documentation': 'primary',
    'duplicate': 'secondary',
    'good first issue': 'success',
    'bug' : 'danger',
    'invalid': 'warning',
    'question': 'info',
    'help wanted': 'light',
    'enhancement': 'dark'
  },
  octokit : new Octokit({
    auth: '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'
  }),
  owner: 'planetarium',
  repo: 'take-home-2022-cj4207',
}