var fs = require('fs');
var existsSync = require('fs').existsSync || require('path').existsSync;
var path = require('path');
var versioning = require('pre-gyp-versioning')
var bindings = require('bindings');

module.exports = Binding;

function Binding(name,opts) {
    opts = opts || {};
    if (!opts.module_root) opts.module_root = bindings.getRoot(bindings.getFileName(__filename));
    var package_json_path = path.join(opts.module_root,'package.json');
    if (!existsSync(package_json_path)) {
        throw new Error("package.json not found: expected at '" + package_json_path + "'");
    }
    var package_json = require(package_json_path);
    versioning.validate_config(package_json);
    var ext = path.extname(name);
    if (ext == 'node') {
        name = name.replace(ext,'');
    }
    if (name != package_json.binary.module_name) {
        throw new Error("'" + name + "' does not match the 'binary.module_name' ("+package_json.binary.module_name+") in "+package_json_path);        
    }
    var meta = versioning.evaluate(package_json,opts);
    var binding_path = path.join(meta.module_path,meta.module_name + '.node');
    return require(binding_path);
}

