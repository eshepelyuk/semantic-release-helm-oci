const fsPromises = require('fs').promises;
const execa = require('execa');
const yaml = require('js-yaml');
const path = require('path');

module.exports = async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  chartPath = pluginConfig.chartPath || './';
  const filePath = path.join(chartPath, 'Chart.yaml');
  const ch = yaml.load(await fsPromises.readFile(filePath));

  const appVersion = pluginConfig.skipAppVersion ? ch.appVersion : version;

  await execa('helm', ['package', '--version', version, '--app-version', appVersion, chartPath], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log(`Chart packaged to ${ch.name}-${version}.tgz.`);
};
