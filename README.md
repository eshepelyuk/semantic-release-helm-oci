# semantic-release-helm-oci

[semantic-release](https://github.com/semantic-release/semantic-release) plugin
for publishing Helm charts to OCI compatible registries.

[![NPM](https://img.shields.io/npm/v/@eshepelyuk/semantic-release-helm-oci?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@eshepelyuk/semantic-release-helm-oci)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-release)
[![MIT License](https://img.shields.io/github/license/eshepelyuk/semantic-release-helm-oci?logo=mit&style=for-the-badge)](https://opensource.org/licenses/MIT)

| Step               | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `verifyConditions` | Verify plugin configuration and login to Helm registry.  |
| `prepare`          | Package Helm chart to local folder.                      |
| `publish`          | Publish Helm chart to OCI registry.                      |

## Installation

```bash
npm i @eshepelyuk/semantic-release-helm-oci -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file
](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

**`.releaserc.json`**
```json
{
  "plugins": [
    ["@eshepelyuk/semantic-release-helm-oci", {
      "registry": "oci://ghcr.io/eshepelyuk/abc"
    }]
  ]
}
```

**`.releaserc.yaml`**
```yaml
plugins:
  -
    - '@eshepelyuk/semantic-release-helm-oci'
    - registry: oci://ghcr.io/eshepelyuk/abc
```

With this example, for each release, a Helm chart will be published to
`oci://ghcr.io/eshepelyuk/abc/${CHART_NAME}:${CHART_VERSION}`.
Where `${CHART_NAME}` is a name from `Chart.yaml`
and `${CHART_VERSION}` is a version detected by semantic-release.

### `version` and `appVersion` in Chart.yaml

Plugin intentionally doesn't modify Chart.yaml during the release.
It's recommended to use Git tags for maintaining release versions.

The plugin leverages `--version` and `--app-version` when calling `helm package`
to manage published chart versions and not rely on `Chart.yaml`.

There's two usage scanarios for this plugin:

1. The chart and the application are co-located in the same repository.

    In this case, the `version` and `appVersion` are both changed during a release.
    This is a default plugin's behaviour.

1. The chart is maintained separately from the application.

    In this case `appVersion` is modified outside of chart's release process
    and must be updated manually in Chart.yaml. To prevent plugin from setting `--app-version` -
    use `skipAppVersion` option.

## Configuration

### Environment variables

Credentials for OCI registry authentification are passed through environment variables:

| Variable            | Description                          |
| ------------------- | ------------------------------------ |
| `REGISTRY_USERNAME` | **Required.** OCI registry username. |
| `REGISTRY_PASSWORD` | **Required.** OCI registry password. |

### Options

| Option            | Description                                                       | Type      | Default   |
| ------------------|-------------------------------------------------------------------|-----------|-----------|
| `registry`        | **Required.** Registry URL with `oci://` schema,<br>e.g. `oci://ghcr.io/eshepelyuk/abc`. | string    | undefined |
| `skipAppVersion`  | Don't update `appVersion` in Chart.yaml.                          | boolean   | false     |

