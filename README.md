# semantic-release plugin for Helm OCI

[![Current](https://img.shields.io/github/v/tag/eshepelyuk/semantic-release-helm-oci?logo=github&sort=semver&style=for-the-badge&label=current)](https://github.com/eshepelyuk/semantic-release-helm-oci/releases/latest)
[![MIT License](https://img.shields.io/github/license/eshepelyuk/semantic-release-helm-oci?logo=mit&style=for-the-badge)](https://opensource.org/licenses/MIT)

[semantic-release](https://github.com/semantic-release/semantic-release) plugin
for publishing Helm charts to OCI compatible registries.

| Step               | Description                                                  |
|--------------------|--------------------------------------------------------------|
| `verifyConditions` | Verify required configuraiotn and login to Helm registry.    |
| `prepare`          | Package Helm chart to local folder.                          |
| `publish`          | Publish Helm chart to OCI registry.                          |

## Installation

```bash
npm install @eshepelyuk/semantic-release-helm-oci -D
```

## Configuration

| Option            | Description                                                       | Type      | Default   |
| ------------------|-------------------------------------------------------------------|-----------|-----------|
| registry          | URI of a container registry. e.g. ghcr.io/MyOrg/mychart           | string    | undefined |

### Credentials for OCI registry

Passed through environment variables:

```bash
export REGISTRY_USERNAME=<USERNAME>
export REGISTRY_PASSWORD=<PASSWORD>
```

## Examples

Using json config format

```json
{
  "plugins": [
    [
      "@eshepelyuk/semantic-release-helm-oci",
      {
        "registry": "ghcr.io/MyOrg/mypath"
      }
    ]
  ]
}
```

or via yaml config

```yaml
plugins:
  -
    - '@eshepelyuk/semantic-release-helm-oci'
    - registry: ghcr.io/MyOrg/mypath
```
