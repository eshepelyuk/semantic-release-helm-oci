const fsPromises = require('fs').promises;
const execa = require('execa');

module.exports = async (pluginConfig, context) => {
  const {logger, nextRelease: {version}} = context;

  await execa('helm', ['package', '--version', version, '--app-version', version, "."], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });
  logger.log('Chart successfully packaged.');
};
