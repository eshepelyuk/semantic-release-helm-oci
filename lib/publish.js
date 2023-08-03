import fsPromises from  'fs/promises';
import yaml from  'js-yaml';
import execa from  'execa';

export default async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  const ch = yaml.load(await fsPromises.readFile("./Chart.yaml"));

  await execa('helm', ['push', `${ch.name}-${version}.tgz`, pluginConfig.registry], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log(`Chart published to ${pluginConfig.registry}.`);
};

