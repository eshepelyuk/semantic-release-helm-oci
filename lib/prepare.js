import fsPromises from 'fs/promises';
import execa from 'execa';
import yaml from 'js-yaml';

export default async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  const ch = yaml.load(await fsPromises.readFile("./Chart.yaml"));

  const appVersion = pluginConfig.skipAppVersion ? ch.appVersion : version;

  await execa('helm', ['package', '--version', version, '--app-version', appVersion, "."], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log(`Chart packaged to ${ch.name}-${version}.tgz.`);
};
