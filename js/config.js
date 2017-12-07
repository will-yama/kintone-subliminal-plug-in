/*
 * Subliminal plugin
 *
 * Licensed under the MIT License
 */

jQuery.noConflict();

(function($, PLUGIN_ID) {
    'use strict';

    $(document).ready(function() {
        function escapeHtml(htmlstr) {
            return htmlstr
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&quot;')
                .replace(/'/g, '&#39;');
        }


        var currentConf = kintone.plugin.app.getConfig(PLUGIN_ID);
        var param = {'app': kintone.app.getId()};

        //Get form layout of App to get all Space elements
        kintone.api(kintone.api.url('/k/v1/preview/app/form/layout', true), 'GET', param, function(resp) {
            for (var i = 0; i < resp.layout.length; i++) {
                var row = resp.layout[i];
                // Ignore a loop is row.type is SUBTANLE or GROUP
                if (row.type !== 'ROW') {continue; }
                // Get Blank space info and set it to the dropdown
                for (var count = 0; count < row.fields.length; count++) {
                    var rowField = row.fields[count];
                    var $appendhtmlSpace;
                    if (rowField.type === 'SPACER' && rowField.elementId !== '') {
                        $appendhtmlSpace = $('<option value = ' + '"' + escapeHtml(rowField.elementId) + '">' +
                        escapeHtml(rowField.elementId) + '</option>');
                        $appendhtmlSpace.appendTo("#select_blank_space_element");
                    }
                }
            }
            $('#select_blank_space_element').val(currentConf['subliminalPlugin-spaceID']);
            $('#input_image_url').val(currentConf['subliminalPlugin-imageURL']);
            $('#input_subliminal_interval').val(currentConf['subliminalPlugin-intervaltime']);
            $('#select_displaytime_element').val(currentConf['subliminalPlugin-displaytime']);

        });

        //Get all config data currently on the browser
        function getUpdatedConfigSettings() {
            var config = {
                "subliminalPlugin-spaceID": escapeHtml($('#select_blank_space_element').val()),
                "subliminalPlugin-imageURL": escapeHtml($('#input_image_url').val()),
                "subliminalPlugin-intervaltime": escapeHtml($('#input_subliminal_interval').val()),
                "subliminalPlugin-displaytime": escapeHtml($('#select_displaytime_element').val())
            };
            return config;
        }

        // Set all updated config data when Save is clicked
        $('#subliminal-submit').on('click', function() {
            var config = getUpdatedConfigSettings();
            // Save settings
            kintone.plugin.app.setConfig(config);
        });

        // Cancel
        $('#subliminal-cancel').on('click', function() {
            window.history.back();
        });

    });
})(jQuery, kintone.$PLUGIN_ID);
