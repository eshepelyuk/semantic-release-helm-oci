const fsPromises = require('fs').promises;
const yaml = require('js-yaml');
const execa = require('execa');

module.exports = async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  const ch = yaml.load(await fsPromises.readFile("./Chart.yaml"));

  await execa('helm', ['push', `${ch.name}-${version}.tgz`, pluginConfig.registry], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log(`Chart published to ${pluginConfig.registry}.`);
};

