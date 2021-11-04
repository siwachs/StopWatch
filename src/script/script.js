$(function () {
    var mode = false;
    var for_lap = 0, for_timer = 0;
    var lap_cs = 0, lap_sec = 0, lap_min = 0;
    var cs = 0, sec = 0, min = 0;
    var lap_no = 0;
    var counter = null;
    var buttons = ['#start', '#resume', '#stop', '#lap', '#reset'];


    $('#start').on('click', function () {
        showhide('#stop', '#lap');
        mode = true;

        start();
    });

    $('#stop').on('click', function () {
        showhide('#resume', '#reset');
        clearInterval(counter);
    });

    $('#resume').on('click', function () {
        showhide('#stop', '#lap');
        start();
    });

    $('#reset').on('click', function () {
        location.reload();
    });

    $('#lap').on('click', function () {
        clearInterval(counter);
        lap_no++;
        add_lap();
        lap_cs = lap_min = lap_sec, for_lap = 0;
        $('#min').html(formating(lap_min));
        $('#sec').html(formating(lap_sec));
        $('#cs').html(formating(lap_cs));
        start();

    });

    function start() {
        counter = setInterval(function () {
            for_lap++;
            for_timer++;
            updateTimer();
        }, 10);
    }

    function updateTimer() {

        lap_min = Math.floor(for_lap / 6000);
        lap_sec = Math.floor((for_lap % 6000) / 100);
        lap_cs = (for_lap % 6000) % 100;

        $('#min').html(formating(lap_min));
        $('#sec').html(formating(lap_sec));
        $('#cs').html(formating(lap_cs));

        //for main counter
        min = Math.floor(for_timer / 6000);
        sec = Math.floor((for_timer % 6000) / 100);
        cs = (for_timer % 6000) % 100;

        $('#minx').html(formating(min));
        $('#secx').html(formating(sec));
        $('#csx').html(formating(cs));
    }

    function add_lap() {
        var details = '<div class="lap_box">' +
            '<div class="lap_no">' +
            'Lap' + lap_no +
            '</div>' +
            '<div class="lap_time">' +
            '<span>' + formating(lap_min) + '</span>' +
            ':<span>' + formating(lap_sec) + '</span>' +
            ':<span>' + formating(lap_cs) + '</span>' +
            '</div>' +
            '</div>';

        $(details).prependTo('#lap_count');
    }

    function formating(x) {
        if (x <= 9) return '0' + x;
        return x;
    }

    function showhide(x, y) {
        for (i = 0; i < buttons.length; i++) {
            $(buttons[i]).hide();
        }

        if (buttons.indexOf(x) !== -1) {
            $(x).show();
        }
        if (buttons.indexOf(y) !== -1) {
            $(y).show();
        }
    }
});