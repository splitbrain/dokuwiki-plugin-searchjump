var sjump = {
    $found:  null,
    current: 0,
    dialog:  null,

    /**
     * create and display search jump dialog
     */
    init: function () {
        sjump.$found = jQuery('span.mark');
        if (!sjump.$found.length) return;


        sjump.dialog = document.createElement('div');
        sjump.dialog.id = 'search__jump';

        var prev = document.createElement('img');
        prev.src = DOKU_BASE + 'lib/plugins/searchjump/pix/up.gif';
        prev.title = LANG.plugins.searchjump['up']+' [k]';
        prev.onclick = function () {
            sjump.jump_by(-1);
        };

        var close = document.createElement('img');
        close.src = DOKU_BASE + 'lib/plugins/searchjump/pix/close.gif';
        close.title = LANG.plugins.searchjump['close']+' [x]';
        close.onclick = sjump.close;

        var next = document.createElement('img');
        next.src = DOKU_BASE + 'lib/plugins/searchjump/pix/down.gif';
        next.title = LANG.plugins.searchjump['down']+' [j]';
        next.onclick = function () {
            sjump.jump_by(1);
        };

        sjump.dialog.appendChild(prev);
        sjump.dialog.appendChild(close);
        sjump.dialog.appendChild(next);

        jQuery(document).bind('keypress', sjump.keyhandle);

        // for the dokuwiki template:
        var $page = jQuery('#dokuwiki__content').find('div.page');
        if($page.length) {
            jQuery(sjump.dialog).css('left', $page.offset().left + 'px');
        }

        document.body.appendChild(sjump.dialog);
        sjump.jump_by(0);
    },

    /**
     * Jump to the next or previous found
     */
    jump_by: function (diff) {
        // manage document wraps
        sjump.current += diff;
        if (sjump.current >= sjump.$found.length) {
            alert(LANG.plugins.searchjump['start']);
            sjump.current = 0;
        }
        if (sjump.current < 0) {
            alert(LANG.plugins.searchjump['end']);
            sjump.current = sjump.$found.length - 1;
        }

        // move position of dialog
        jQuery(sjump.dialog).css('top', jQuery(sjump.$found[sjump.current]).offset().top + 'px');
        // jump
        sjump.$found[sjump.current].scrollIntoView();
        jQuery(sjump.$found[sjump.current]).delay(50).fadeOut().fadeIn();
    },

    /**
     * close dialog and remove highlight
     */
    close: function () {
        // remove key handler
        jQuery(document).unbind('keypress', sjump.keyhandle);

        // remove hilighting
        sjump.$found.removeClass('search_hit');

        // close dialog
        document.body.removeChild(sjump.dialog);
    },

    /**
     * Handles keypresses for next prev
     *
     * @param {Event} e
     */
    keyhandle: function (e) {
        if (e.keyCode == 106) { // j
            sjump.jump_by(1);
        } else if (e.keyCode == 107) { // k
            sjump.jump_by(-1);
        } else if (e.keyCode == 120) { // x
            sjump.close();
        } else {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
    }
};

jQuery(sjump.init);
