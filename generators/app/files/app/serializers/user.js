import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  serialize: function(snapshot, options) {
    var json = this._super(...arguments);
    json.password = snapshot.record.get('password');
    json.passwordConfirm = snapshot.record.get('passwordConfirm');
    return json;
  },
  serializeIntoHash: function(hash, typeClass, snapshot, options) {
    var normalizedRootKey = this.payloadKeyFromModelName(typeClass.modelName);
    hash[normalizedRootKey] = this.serialize(snapshot, options);
    hash.password = hash.user.password;
    hash.passwordConfirm = hash.user.passwordConfirm;
  },
});
