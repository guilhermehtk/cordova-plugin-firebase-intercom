"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var FIREBASE_PLUGIN_SERVICE_NODES = [
    'org.apache.cordova.firebase.FirebasePluginMessagingService'
];
module.exports = function (context) {
    var fs = context.requireCordovaModule('fs');
    var path = context.requireCordovaModule('path');
    var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
    var manifestPath = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');
    var manifestFile = fs.readFileSync(manifestPath, { encoding: 'utf8' });
    try {
        var manifest_1 = new utils_1.AndroidManifestUtils(manifestFile);
        FIREBASE_PLUGIN_SERVICE_NODES.forEach(function (serviceName) {
            return manifest_1.removeServiceNodeBy({ name: serviceName });
        });
        fs.writeFileSync(manifestPath, manifest_1.toString(), { encoding: 'utf8' });
    }
    catch (err) {
        console.error("An error ocurred removing the FirebasePlugin service nodes from '" + manifestPath + "':", err);
    }
};
//# sourceMappingURL=remove-firebase-plugin-nodes.hook.js.map