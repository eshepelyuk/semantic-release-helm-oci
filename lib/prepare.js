const execa = require('execa');

module.exports = async (pluginConfig, context) => {
  const logger = context.logger;
  const version = context.nextRelease.version;

  await execa('helm', ['package', '--version', version, '--app-version', version, "."], {
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });
  logger.log('Chart successfully packaged.');
};
