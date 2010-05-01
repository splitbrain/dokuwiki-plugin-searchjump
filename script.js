var sjump = {
    found: [],
    current: 0,
    dialog: null,

    /**
     * create and display search jump dialog
     */
    init: function(){
        sjump.found = getElementsByClass('search_hit',document,'span');
        if(!sjump.found.length) return;


        sjump.dialog = document.createElement('div');
        sjump.dialog.id = 'search__jump';

        var prev = document.createElement('img');
        prev.src = DOKU_BASE+'lib/plugins/searchjump/pix/up.gif';
        prev.title = LANG.plugins.searchjump['up'];
        prev.onclick = function(){ sjump.jump_by(-1); };

        var close = document.createElement('img');
        close.src = DOKU_BASE+'lib/plugins/searchjump/pix/close.gif';
        close.title = LANG.plugins.searchjump['close'];
        close.onclick = sjump.close;

        var next = document.createElement('img');
        next.src = DOKU_BASE+'lib/plugins/searchjump/pix/down.gif';
        next.title = LANG.plugins.searchjump['down'];
        next.onclick = function(){ sjump.jump_by(1); };

        sjump.dialog.appendChild(prev);
        sjump.dialog.appendChild(close);
        sjump.dialog.appendChild(next);

        document.body.appendChild(sjump.dialog);
        sjump.jump_by(0);
    },

    /**
     * Jump to the next or previous found
     */
    jump_by: function(diff){
        // manage document wraps
        sjump.current += diff;
        if(sjump.current >= sjump.found.length){
            alert(LANG.plugins.searchjump['start']);
            sjump.current = 0;
        }
        if(sjump.current < 0){
            alert(LANG.plugins.searchjump['end']);
            sjump.current = sjump.found.length-1;
        }

        // move position of dialog
        sjump.dialog.style['top'] = findPosY(sjump.found[sjump.current])+'px';
        // jump
        sjump.found[sjump.current].scrollIntoView();
    },

    /**
     * close dialog and remove highlight
     */
    close: function(){
        // remove hilighting
        for(var i=0; i < sjump.found.length; i++){
            sjump.found[i].className = '';
        }
        // close dialog
        document.body.removeChild(sjump.dialog);
    }
}

addInitEvent(sjump.init);
