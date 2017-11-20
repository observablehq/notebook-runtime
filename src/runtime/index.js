import thenable from "../thenable";
import runtime_compute from "./compute";
import runtime_module, {runtime_weakModule} from "./module";

export default function(builtins = {}) {
  return new Runtime(builtins);
}

function Runtime(builtins) {
  this._dirty = new Set;
  this._updates = new Set;
  this._computing = null;
  var module = this.module();
  this._scope = module._scope;
  if (builtins) for (var key in builtins) {
    var variable = module.variable();
    variable._id = -3; // TODO Cleaner indication of builtins.
    variable._value = thenable(builtins[key]) ? builtins[key] : Promise.resolve(builtins[key]);
    module._scope.set(key, variable);
  }
}

Runtime.prototype._compute = runtime_compute;
Runtime.prototype.module = runtime_module;
Runtime.prototype.weakModule = runtime_weakModule;
