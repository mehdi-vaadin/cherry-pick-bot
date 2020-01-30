import { Application, Octokit } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  // const REPO: string = "PlayGround"
  // const OWNER: string = "mehdi-vaadin"
  console.log('bot has started!')

  app.on('pull_request.closed', async (context) => {
    console.log('pr has been closed!')
    // const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    const pr = context.payload
    if (pr.pull_request.merged) {
      // pr.pull_request.merge_commit_sha;

      // var masterBranch: context.repo({ "master" })
      // Octokit.ReposGetBranchParams = {
      //   branch: "master",
      //
      //   owner: OWNER,
      //
      //   repo: REPO
      // }

      console.log('pr has been merged!')
      var master = await context.github.repos.getBranch(context.repo({ branch: 'master' }))
      console.log(master.data.commit.sha)
      // merge_commit_sha

      var params: Octokit.GitCreateRefParams = {
        owner: 'vaadin',
        ref: 'heads/pick',

        repo: 'flow',
        sha: ''
      }

      // context.github.git.createRef()

      // var master = await client.Git.Reference.Get(Helper.UserName, repository.Name, "heads/master");
      // await client.Git.Reference.Create(Helper.UserName, repository.Name, new NewReference("refs/heads/" + branchName, master.Object.Sha));
    }
  })
  // context.log(context.payload)
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
}
