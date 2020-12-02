const execa = require('execa');

module.exports = async (pluginConfig, context) => {
  const env = context.env;
  const logger = context.logger;

  if (!pluginConfig.registry) {
    throw new Error("Missing configurations: registry");
  }

  logger.log("Using registry: ", pluginConfig.registry);

  if (env.REGISTRY_USERNAME && env.REGISTRY_PASSWORD) {
    const url = pluginConfig.registry.split("/")[0];
    await verifyRegistryLogin(url, env.REGISTRY_USERNAME, env.REGISTRY_PASSWORD);
  } else {
    throw new Error("REGISTRY_USERNAME and/or REGISTRY_PASSWORD environment variables are not set.");
  }
};

async function verifyRegistryLogin(registryUrl, registryUsername, registryPassword) {
  await execa('helm', ['registry', 'login', '--username', registryUsername, '--password-stdin', registryUrl], {
    input: registryPassword,
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });
}

