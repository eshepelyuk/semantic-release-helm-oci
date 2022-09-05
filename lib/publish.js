const fsPromises = require('fs').promises;
const yaml = require('js-yaml');
const execa = require('execa');
const path = require('path');

module.exports = async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  chartPath = pluginConfig.chartPath || './';
  const filePath = path.join(chartPath, 'Chart.yaml');
  const ch = yaml.load(await fsPromises.readFile(filePath));

  await execa('helm', ['push', `${ch.name}-${version}.tgz`, pluginConfig.registry], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log(`Chart published to ${pluginConfig.registry}.`);
};

