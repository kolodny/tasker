;(function(TA, Backbone, Marionette, $, _) {
    "use strict";

    TA.module('Tasks', function(Mod, App, Backbone, Marionette, $, _) {
        var TaskView = Marionette.ItemView.extend({
            template: 'Screens/Tasks/Task',
            tagName: 'div',
            className: 'task',
            events: {
                'click .reset-count': 'resetTimer',
                'click .delete-task': 'deleteTask',
                'click .toggle-timer': 'toggleTimer'
            },
            modelEvents: {
                'change:displayTime': 'renderTimer',
                'change:isRunning': 'updateUI',
                'change:isFiltered': 'toggleVisibility'
            },
            ui: {
                $toggleTimer: '.toggle-timer',
                $countContainer: '.count span'
            },
            onRender: function() {
                if (!this.model.isViewable()) {
                    this.$el.hide();
                }

                // check to see if model is running, if so update to accomodate
                this.model.toggleRunning();
                this.updateUI();
            },
            renderTimer: function() {
                this.ui.$countContainer.html(this.model.get('displayTime'));
            },
            toggleVisibility: function() {
                var showHide = (this.model.isViewable()) ? 'show' : 'hide';
                this.$el[showHide]();
            },
            toggleTimer: function() {
                this.model.set('isRunning', !this.model.get('isRunning'));
            },
            updateUI: function() {
                if (this.model.get('isRunning')) {
                    this.ui.$toggleTimer.removeClass('fa-play').addClass('fa-pause');
                } else {
                    this.ui.$toggleTimer.removeClass('fa-pause').addClass('fa-play');
                }

                this.$el.toggleClass('active', this.model.get('isRunning'));
            },
            resetTimer: function() {
                this.model.clearCount();
            },
            deleteTask: function() {
                if(confirm('Are you sure you want to delete this task?')) {
                    this.model.destroy();
                }
            }
        });

        Mod.TaskView = TaskView;
    });
})(TA, Backbone, Marionette, jQuery, _);
