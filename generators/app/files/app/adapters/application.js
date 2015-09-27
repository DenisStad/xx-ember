import DS from 'ember-data';


export default DS.RESTAdapter.extend({
  namespace: "api",
  //host: 'http://localhost:3000',

  handleResponse: function(status, headers, payload) {
    if (this.isInvalid(status, headers, payload)) {
      var errors = [];
      /*
      [
        {
          detail: 'Must be unique',
          source: { pointer: 'data/attributes/title' }
        },
        {
          detail: 'Must not be blank',
          source: { pointer: 'data/attributes/content'}
        }
      ]
      */
      for (var i in payload.errors) {
        for (var j = 0; j < payload.errors[i].length; j++) {
          console.log(payload.errors[i][j])
          errors.push({ detail: payload.errors[i][j], source: { pointer: 'data/attributes/' + i } });
        }
      }

      return new DS.InvalidError(errors);
    } else {
      return this._super(status, headers, payload);
    }
  },
  updateRecord: function(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot);

    var id = snapshot.id;
    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

    return this.ajax(url, "PATCH", { data: data  });
  }
});
