import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import simpleGit from 'simple-git/promise';
import { InitRepoOptions } from '../interfaces';
import { LogLevel } from '../enums';
import { log } from '../utils/log-util';

const BOT_USERNAME = "mehdi-vaadin";
const BOT_EMAIL = "mehdi@vaadin.com";
const baseDir = path.resolve(os.tmpdir(), 'trop-working');

/**
 * Initializes the cloned repo trop will use to run backports.
 *
 * @param {InitRepoOptions} options - repo and payload for repo initialization
 * @returns {Object} - an object containing the repo initialization directory
 */
export const initRepo = async ({ slug, accessToken }: InitRepoOptions) => {
  log('initRepo', LogLevel.INFO, 'Setting up local repository');

  await fs.mkdirp(path.resolve(baseDir, slug));
  const prefix = path.resolve(baseDir, slug, 'job-');
  const dir = await fs.mkdtemp(prefix);

  // Ensure that this directory is empty.
  await fs.mkdirp(dir);
  await fs.remove(dir);
  await fs.mkdirp(dir);

  const git = simpleGit(dir);

  await git.clone(
    `https://x-access-token:${accessToken}@github.com/${slug}.git`,
    '.',
  );

  // Clean up just in case.
  await git.reset('hard');
  const status = await git.status();

  for (const file of status.not_added) {
    await fs.remove(path.resolve(dir, file));
  }

  await git.checkout('master');
  await git.pull();
  await git.addConfig('user.email', BOT_EMAIL);
  await git.addConfig('user.name', BOT_USERNAME);
  await git.addConfig('commit.gpgsign', 'false');
  return { dir };
};
