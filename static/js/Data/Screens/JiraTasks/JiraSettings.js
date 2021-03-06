;(function(TA, Backbone, Marionette, jQuery, _) {
    "use strict";

    TA.module('JIRA', function(Mod, App, Backbone, Marionette, $, _) {
        var JiraSettings = Backbone.Model.extend({
            localStorage: new Backbone.LocalStorage('JiraSettings'),
            defaults: {
                username: '',
                password: '',
                jiraUrl: '',
                hasLoginCreds: false,
                displayName: '',
                avatars: {},
                isVisible: true
            }
        });

        var jiraSettings = new JiraSettings({id: 1});

        App.reqres.setHandler('jiraSettings', function() {
            var deferred = new $.Deferred();

            jiraSettings.fetch().always(function() {
                deferred.resolve(jiraSettings);
            });

            return deferred.promise();
        });

        Mod.JiraSettings = JiraSettings;
    });

})(TA, Backbone, Marionette, jQuery, _);