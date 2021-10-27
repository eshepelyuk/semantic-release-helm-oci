# semantic-release-helm-oci

[semantic-release](https://github.com/semantic-release/semantic-release) plugin
for publishing Helm charts to OCI compatible registries.

[![NPM](https://img.shields.io/npm/v/@eshepelyuk/semantic-release-helm-oci?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@eshepelyuk/semantic-release-helm-oci)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-release)
[![MIT License](https://img.shields.io/github/license/eshepelyuk/semantic-release-helm-oci?logo=mit&style=for-the-badge)](https://opensource.org/licenses/MIT)

| Step               | Description                                                  |
|--------------------|--------------------------------------------------------------|
| `verifyConditions` | Verify required configuration options and login to Helm registry.    |
| `prepare`          | Package Helm chart to local folder.                          |
| `publish`          | Publish Helm chart to OCI registry.                          |

## Installation

```bash
npm i @eshepelyuk/semantic-release-helm-oci -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file
](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

##### **`.releaserc.json`**
```json
{
  "plugins": [
    ["@eshepelyuk/semantic-release-helm-oci", {
      "registry": "oci://ghcr.io/eshepelyuk/abc"
    }]
  ]
}
```

##### **`.releaserc.yaml`**
```yaml
plugins:
  -
    - '@eshepelyuk/semantic-release-helm-oci'
    - registry: oci://ghcr.io/eshepelyuk/abc
```

## Configuration

### Credentials

Credentials for OCI registry are passed through environment variables:

```bash
export REGISTRY_USERNAME=<registry username value>
export REGISTRY_PASSWORD=<registry password value>
```

### Options

| Option            | Description                                                       | Type      | Default   |
| ------------------|-------------------------------------------------------------------|-----------|-----------|
| `registry`        | Registry URL with `oci://` schema, e.g. `oci://ghcr.io/eshepelyuk/abc` | string    | undefined |
| `skipAppVersion`  | Don't update `appVersion` in Chart.yaml | boolean | false |

