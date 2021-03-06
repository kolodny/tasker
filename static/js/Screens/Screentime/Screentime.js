;(function(TA, Backbone, Marionette, $, _) {
    "use strict";

    var DEFAULT_PAGE_SIZE = 150;

    TA.module('Screentime.Layout', function(Mod, App, Backbone, Marionette, $, _) {
        var ScreentimeLayout = Marionette.Layout.extend({
            template: 'Screens/Screentime/Screentime',
            className: 'screentime',
            regions: {
                controlBarRegion: '#control-bar-region',
                activitiesRegion: '#activities-region'
            },
            onRender: function() {
                var self = this;

                $.get('/img/screens/screens-list.txt').done(function(data) {
                    var imageArr = _(data.split("\n")).compact().map(function(item) { return 'img/screens/thumbs/' + item; });

                    var currentImages = imageArr.slice(-DEFAULT_PAGE_SIZE);
                    var imgs = _(currentImages).map(function(item, i) { return { src: item, globalIndex: i }; });

                    App.Data.Screentime.screenshotCollection.set(imgs);

                    var activities = App.Data.Screentime.screenshotCollection.groupBy(function(item) {
                        // TODO: be smarter about grouping?
                        return item.get('moment').format('YYYY-MM-DD HH');
                    });
                    activities = _(activities).map(function(item) { return { screenshots: item }; });
                    App.Data.Screentime.activityCollection.set(activities);

                    self.activitiesRegion.show(new TA.Screentime.ActivityGroup({collection: App.Data.Screentime.activityCollection}));
                });

                // setup prev/next buttons on modal.
                // TODO: this should be a view
                $('#image-zoom').find('.modal-header .prev').click(function(evt) { switchImg(this, 'prev'); });
                $('#image-zoom').find('.modal-header .next').click(function(evt) { switchImg(this, 'next'); });
                var switchImg = function(btn, direction) {
                    var currentIdx = +$(btn).attr('data-current-idx'),
                        idxToOpen = (direction === 'prev') ? currentIdx - 1 : currentIdx + 1;

                    $($('.shot')[idxToOpen]).click(); // TODO: this is kind of a hack
                };
            }
        });

        Mod.addInitializer(function() {
            App.execute('registerScreen', {
                position: 4,
                screenKey: 'screentime',
                iconClass: 'fa-laptop',
                anchorText: 'Screentime',
                initializer: function() {
                    return new ScreentimeLayout();
                }
            });
        });
    });
})(TA, Backbone, Marionette, jQuery, _);