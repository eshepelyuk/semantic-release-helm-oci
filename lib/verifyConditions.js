import { URL } from 'url';
import execa from 'execa';
import SemanticReleaseError from "@semantic-release/error";

export default async (pluginConfig, context) => {
  const {env, logger} = context;

  const registryURL = parseRegistryURL(pluginConfig.registry, logger);

  if (env.REGISTRY_USERNAME && env.REGISTRY_PASSWORD) {
    await verifyRegistryLogin(registryURL.host, env.REGISTRY_USERNAME, env.REGISTRY_PASSWORD);
  } else {
    throw new SemanticReleaseError("Invalid registry credentials", "ECFG", "Set up REGISTRY_USERNAME and REGISTRY_PASSWORD environment variables.");
  }

  logger.log(`Using registry: ${registryURL}`);
};

function parseRegistryURL(registry, logger) {
  let retval;
  try {
    retval = new URL(registry);
  } catch (e) {
    logger.error("Error parsing registry", e);
    throwRegistryError(registry);
  }

  if (retval.protocol !== "oci:"
    || !retval.pathname
    || retval.pathname.length < 2
  ) throwRegistryError(registry);

  return retval;
}

function throwRegistryError(registry) {
  throw new SemanticReleaseError(`Invalid registry: ${registry}`, "ECFG", "Must be URL with path and `oci://' protocol");
}

async function verifyRegistryLogin(registryUrl, registryUsername, registryPassword) {
  await execa('helm', ['registry', 'login', '--username', registryUsername, '--password-stdin', registryUrl], {
    input: registryPassword,
    env: {HELM_EXPERIMENTAL_OCI: 1}
  });
}

