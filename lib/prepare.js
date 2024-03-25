import fsPromises from 'fs/promises';
import execa from 'execa';
import yaml from 'js-yaml';
import path from 'path';

export default async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  const chartPath = pluginConfig.chartPath || "./";
  const filePath = path.join(chartPath, "/Chart.yaml");
  const ch = yaml.load(await fsPromises.readFile(filePath));

  const appVersion = pluginConfig.skipAppVersion ? ch.appVersion : version;

  await execa('helm', ['package', '--version', version, '--app-version', appVersion, chartPath], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log(`Chart packaged to ${ch.name}-${version}.tgz.`);
};
