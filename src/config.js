/**
 * Gets the configuration
 * @flow
 */

import {
  ProjectSettings,
} from 'xdl';

import JsonFile from '@exponent/json-file';
import path from 'path';
import log from './log';

let packageJsonFile = new JsonFile('package.json');

function projectExpJsonFile(projectRoot: string) {
  let jsonFilePath = path.join(
    ProjectSettings.dotExponentProjectDirectory(projectRoot),
    'exp-cli.json',
  );
  return new JsonFile(jsonFilePath, { cantReadFileDefault: {} });
}

async function setProjectStatusAsync(projectRoot: string, state: string, err: ?string) {
  await projectExpJsonFile(projectRoot).mergeAsync({ err, state });
}

async function projectStatusAsync(projectRoot: string): Promise<?string> {
  if (ProjectSettings.dotExponentProjectDirectoryExists(projectRoot)) {
    return await projectExpJsonFile(projectRoot).getAsync('state', null);
  } else {
    log.error("No project found at " + projectRoot);
    return null;
  }
}

export default {
  packageJsonFile,
  projectExpJsonFile,
  projectStatusAsync,
  setProjectStatusAsync,
};
