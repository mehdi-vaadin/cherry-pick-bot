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

  // const REPO: string = "PlayGround"
  // const OWNER: string = "mehdi-vaadin"
  app.log('bot has started!')

  app.on('pull_request.closed', async (context: Context) => {
    app.log('pr has been closed!')
    // const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    const pr = context.payload.pull_request;
    if (pr.merged) {
      // pr.pull_request.merge_commit_sha;

      // var masterBranch: context.repo({ "master" })
      // Octokit.ReposGetBranchParams = {
      //   branch: "master",
      //
      //   owner: OWNER,
      //
      //   repo: REPO
      // }

      app.log('pr has been merged!')
      var master = await context.github.repos.getBranch(context.repo({ branch: 'master' }))
      app.log(master.data.commit.sha)
      // merge_commit_sha

      var params: Octokit.GitCreateRefParams = {
        owner: 'vaadin',
        ref: 'heads/pick',

        repo: 'flow',
        sha: ''
      }

      backportAllLabels(context, pr);

      // context.github.git.createRef()

      // var master = await client.Git.Reference.Get(Helper.UserName, repository.Name, "heads/master");
      // await client.Git.Reference.Create(Helper.UserName, repository.Name, new NewReference("refs/heads/" + branchName, master.Object.Sha));
    }
  })
  // context.app.log(context.payload)
  // await context.github.issues.createComment(issueComment)

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  // app.on('pull_request.closed', async context => {
  // merge_commit_sha
  // merged

  //   "labels": [
  //     {
  //     "id": 208045946,
  //     "node_id": "MDU6TGFiZWwyMDgwNDU5NDY=",
  //     "url": "https://api.github.com/repos/octocat/Hello-World/labels/bug",
  //     "name": "bug",
  //     "description": "Something isn't working",
  //     "color": "f29513",
  //     "default": true
  //     }
  //   ],

  const backportAllLabels = (context: Context, pr: PullsGetResponse) => {
    for (const label of pr.labels) {
      context.payload.pull_request = context.payload.pull_request || pr;
      backportToLabel(app, context, label);
    }
  };
}
