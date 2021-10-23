const fsPromises = require('fs').promises;
const yaml = require('js-yaml');
const execa = require('execa');

module.exports = async (pluginConfig, context) => {
  const logger = context.logger;
  const version = context.nextRelease.version;

  const ch = yaml.load(await fsPromises.readFile("./Chart.yaml"));

  await execa('helm', ['push', `${ch.name}-${version}.tgz`, `oci://${pluginConfig.registry}`], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log('Chart successfully published.');
};

