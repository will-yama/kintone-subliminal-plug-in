/*
 * Subliminal Plug-in
 * Licensed under the MIT License
 */

jQuery.noConflict();

(function($, PLUGIN_ID) {
    'use strict';

    // Get Plug-in settings
    var pluginSettings = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (!pluginSettings) { return false; }

    kintone.events.on("app.record.detail.show", function(event) {

        //Set image on to the Blank space field
        var spaceID = pluginSettings["subliminalPlugin-spaceID"];
        var space_element = kintone.app.record.getSpaceElement(spaceID);
        var space_width = space_element.offsetWidth;
        var img = document.createElement("img");
        img.src = pluginSettings["subliminalPlugin-imageURL"];
        img.width = space_width;
        space_element.appendChild(img);


        //Set Subliminal image timings
        var subliminal_interval = pluginSettings["subliminalPlugin-intervaltime"];
        var timeout_milliseconds = pluginSettings["subliminalPlugin-displaytime"] * 1000;
        var counter_threshold = (1000 / timeout_milliseconds) * subliminal_interval;
        var timervar = 0;
        var counter = 1;

        //Display and hide image at given intervals
        function timer() {

            if (counter % counter_threshold === 0) {
                img.style.opacity = "1";
            } else {
                img.style.opacity = "0";
            }

            if (counter > counter_threshold) {
                counter = 1;
            } else {
                counter++;
            }

            setTimeout(timer, timeout_milliseconds);
            timervar++;
        }
        timer();
    });
})(jQuery, kintone.$PLUGIN_ID);
