import { AndroidManifestUtils } from '../../utils'

const FIREBASE_PLUGIN_SERVICE_NODES = [
  'org.apache.cordova.firebase.FirebasePluginMessagingService'
]

module.exports = context => {
  const fs = context.requireCordovaModule('fs')
  const path = context.requireCordovaModule('path')
  const platformRoot = path.join(context.opts.projectRoot, 'platforms/android')
  const manifestPath = path.join(platformRoot, 'app/src/main/AndroidManifest.xml')
  const manifestFile = fs.readFileSync(manifestPath, { encoding: 'utf8' })

  try {
    const manifest = new AndroidManifestUtils(manifestFile)

    FIREBASE_PLUGIN_SERVICE_NODES.forEach(serviceName =>
      manifest.removeServiceNodeBy({ name: serviceName })
    )

    fs.writeFileSync(manifestPath, manifest.toString(), { encoding: 'utf8' })
  } catch (err) {
    console.error(`An error ocurred removing the FirebasePlugin service nodes from '${manifestPath}':`, err)
  }
}
