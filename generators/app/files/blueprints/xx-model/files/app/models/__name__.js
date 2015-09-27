import DS from 'ember-data';

export default DS.Model.extend({

<%- "<\% for (var i in model.definition) { %\>" %>  <%- "<\%= i %\>" %>: DS.attr(),
<%- "<\% } %\>" %>
});
