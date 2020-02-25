import { Application, Octokit, Context } from 'probot' // eslint-disable-line no-unused-vars
import { backportToLabel, backportToBranch } from './operations/backport-to-location';

import {
  PullsGetResponse,
  ChecksListForRefResponseCheckRunsItem,
  PullsGetResponseBase,
  ChecksUpdateParams,
  PullsListCommitsResponseItem,
  PullsGetResponseLabelsItem
} from '@octokit/rest';

export = (app: Application) => {

  const CHECK_PREFIX = 'Backportable? - ';

  app.log('bot has started!')

  app.on('pull_request.closed', async (context: Context) => {
    app.log('pr has been closed!')
    const pr = context.payload.pull_request;
    if (pr.merged) {

      app.log('pr has been merged!')
      var master = await context.github.repos.getBranch(context.repo({ branch: 'master' }))
      app.log(master.data.commit.sha)

      var params: Octokit.GitCreateRefParams = {
        owner: 'vaadin',
        ref: 'heads/pick',

        repo: 'flow',
        sha: ''
      }

      backportAllLabels(context, pr);
    }
  })

  const backportAllLabels = (context: Context, pr: PullsGetResponse) => {
    for (const label of pr.labels) {
      context.payload.pull_request = context.payload.pull_request || pr;
      backportToLabel(app, context, label);
    }
  };
}
