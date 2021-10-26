const fsPromises = require('fs').promises;
const execa = require('execa');
const yaml = require('js-yaml');

module.exports = async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  const ch = yaml.load(await fsPromises.readFile("./Chart.yaml"));

  await execa('helm', ['package', '--version', version, '--app-version', version, "."], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });

  logger.log(`Chart packaged to ${ch.name}-${version}.tgz.`);
};
