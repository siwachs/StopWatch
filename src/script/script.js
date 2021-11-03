mode = false;
mini_ctr = main_ctr = 0;
var ms = 0, sec = 0, min = 0;
var msx = 0, secx = 0, minx = 0;
var lap_no = 0;

$(function () {
    $('#start').on('click', function () {
        $('#start').hide();
        $('#stop').show();
        mode = true;
        start_mini_ctr();
        start_main_ctr();
    });

    $('#stop').on('click', function () {
        $('#stop').hide();
        $('#resume').show();
        $('#lap').hide();
        $('#reset').show();
        clearInterval(mini_ctr);
        clearInterval(main_ctr);
    });

    $('#resume').on('click', function () {
        $('#stop').show();
        $('#resume').hide();
        $('#lap').show();
        $('#reset').hide();

        start_main_ctr();
        start_mini_ctr();
    });

    $('#reset').on('click', function () {
        location.reload();
    });

    $('#lap').on('click', function () {
        if (mode) {
            lap_no++;
            clearInterval(mini_ctr);
            add_lap_details();
            ms = 0, sec = 0, min = 0;
            $('#lap_time').html(
                '<p><span id="min">00</span>:<span id="sec">00</span>:<span id="ms">00</span></p>'
            );
            mini_ctr = 0;
            start_mini_ctr();
        }
    });

    function start_mini_ctr() {
        mini_ctr = setInterval(function () {
            ms = ms + 1;
            if (ms <= 9) {
                $('#ms').html('0' + ms);
            } else {
                $('#ms').html(ms);
            }
            if (ms > 99) {
                ms = 0;
                sec = sec + 1;
                if (sec <= 9) {
                    $('#sec').html('0' + sec);
                } else {
                    $('#sec').html(sec);
                }
                $('#ms').html('0' + ms);
            } else if (sec > 59) {
                sec = 0;
                min = min + 1;
                if (min <= 9) {
                    $('#min').html('0' + min);
                } else {
                    $('#min').html(ms);
                }
                $('#sec').html('0' + sec);
            }
        }, 1);
    }

    function start_main_ctr() {
        main_ctr = setInterval(function () {
            msx = msx + 1;
            if (msx <= 9) {
                $('#msx').html('0' + msx);
            } else {
                $('#msx').html(msx);
            }
            if (msx > 99) {
                msx = 0;
                secx = secx + 1;
                if (secx <= 9) {
                    $('#secx').html('0' + secx);
                } else {
                    $('#secx').html(secx);
                }
                $('#msx').html('0' + msx);
            } else if (secx > 59) {
                secx = 0;
                minx = minx + 1;
                if (minx <= 9) {
                    $('#minx').html('0' + minx);
                } else {
                    $('#minx').html(msx);
                }
                $('#secx').html('0' + secx);
            }
        }, 1);
    }

    function add_lap_details() {
        var data = '<div class="details">' +
            '<div class="lap_no">' +
            'Lap' + lap_no +
            '</div>' +
            '<div class="lap">' +
            '<span>' +
            formating(min) + ':' +
            '</span>' +
            '<span>' +
            formating(sec) + ':' +
            '</span>' +
            '<span>' +
            formating(ms) +
            '</span>' +
            '</div>'
            + '</div>'
        $(data).prependTo('#lap_count');
    }

    function formating(x) {
        if (x <= 9) return '0' + x;
    }
});