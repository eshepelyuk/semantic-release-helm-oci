
# semantic-release-helm-oc

[![Current](https://img.shields.io/github/v/tag/eshepelyuk/semantic-release-helm-oci?logo=github&sort=semver&style=for-the-badge&label=current)](https://github.com/eshepelyuk/semantic-release-helm-oci/releases/latest)
[![MIT License](https://img.shields.io/github/license/eshepelyuk/semantic-release-helm-oci?logo=mit&style=for-the-badge)](https://opensource.org/licenses/MIT)

[semantic-release](https://github.com/semantic-release/semantic-release) plugin
for publishing Helm charts to OCI compatible registries.

| Step               | Description                                                  |
|--------------------|--------------------------------------------------------------|
| `verifyConditions` | Verify required configuration options and login to Helm registry.    |
| `prepare`          | Package Helm chart to local folder.                          |
| `publish`          | Publish Helm chart to OCI registry.                          |

## Installation

```bash
npm i @eshepelyuk/semantic-release-helm-oci -D
```

## Usag

| Option            | Description                                                       | Type      | Default   |
| ------------------|-------------------------------------------------------------------|-----------|-----------|
| registry          | URL of a container registry, with `oci://` schema, e.g. oci:://ghcr.io/eshepelyuk/abc                                 | string    | undefined |
| skipAppVersion | Don't uppdate `appVersion` in Chart.yaml | boolean | false |

### Credentials for OCI registry

Passed through environment variables:

```bash
export REGISTRY_USERNAME=${...}
export REGISTRY_PASSWORD=${...}
```

## Examples

#### **`.releaserc.json`**
```json
{
  "plugins": [
    [
      "@eshepelyuk/semantic-release-helm-oci",
      {
        "registry": "oci://ghcr.io/eshepelyuk/abc"
      }
    ]
  ]
}
```

#### **`.releaserc.yaml`**

```yaml
plugins:
  -
    - '@eshepelyuk/semantic-release-helm-oci'
    - registry: oci://ghcr.io/eshepelyuk/abc
```
