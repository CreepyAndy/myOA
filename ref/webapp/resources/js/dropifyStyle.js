/**
 * Created by wjing002 on 12/5/2016.
 */
$(document)
    .ready(
        function() {
            // Basic
            $('.dropify').dropify();
            // Translated
            $('.dropify-fr')
                .dropify(
                    {
                        messages : {
                            'default' : 'ç‚¹å‡»æˆ–æ‹–æ‹½æ–‡ä»¶åˆ°è¿™é‡Œ',
                            'replace' : 'ç‚¹å‡»æˆ–æ‹–æ‹½æ–‡ä»¶åˆ°è¿™é‡Œæ�¥æ›¿æ�¢æ–‡ä»¶',
                            'remove' : 'ç§»é™¤æ–‡ä»¶',
                            'error' : 'å¯¹ä¸�èµ·ï¼Œä½ ä¸Šä¼ çš„æ–‡ä»¶å¤ªå¤§äº†'
                        }
                    });
            // Used events
            var drEvent = $('.dropify-event').dropify();
            drEvent.on('dropify.beforeClear', function(event,
                                                       element) {
                return confirm("Do you really want to delete \""
                    + element.filename + "\" ?");
            });
            drEvent.on('dropify.afterClear', function(event,
                                                      element) {
                alert('File deleted');
            });
        });