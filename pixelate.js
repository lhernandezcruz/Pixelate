$(document).ready(function () {
    // file will hold the input file, img will hold the input when it is input
    // htmlImg will hold the html of the image
    var file = null;
    var htmlImg = null;
    var img = null;

    // pixalate will change how pixalated the image is
    // imgPercent is what size percent it will show
    var pixelate = $("#pixelBar").val() / 100;
    var imgPercent = $('#imageBar').val() / 100;

    // hide input
    $('#inputStyle').hide();

    // have toggle button toggle the styles
    $('.toggle').on('click', function () {
        $('#inputStyle').toggle();
        $('#barStyle').toggle();
    });

    // when pixels range changes... update pixelate (and form) and draw the image
    $('#pixelBar').change(function () {
        pixelate = $("#pixelBar").val() / 100;
        $('#pixelPercentInput').val($("#pixelBar").val());
        drawImage();
    });

    // when pixelPercentForm is submitted... update pixelate (and bar) and draw the image
    $('#pixelPercentForm').on('submit', function (e) {
        e.preventDefault();
        if (isNaN($('#pixelPercentInput').val())) {
            alert('Please input an amount from 0.0 to 100');
        } else {
            pixelate = $('#pixelPercentInput').val() / 100;
            $('#pixelBar').val($('#pixelPercentInput').val());
            drawImage();
        }
    });

    // when person changes img percent... update imgPercent (and form) and draw the image
    $('#imageBar').change(function () {
        imgPercent = $('#imageBar').val() / 100;
        $('#imgPercentInput').val($('#imageBar').val());
        drawImage();
    });

    // when person changes the 
    $('#imgPercentForm').on('submit', function (e) {
        e.preventDefault();
        if (isNaN($('#imgPercentInput').val())) {
            alert('Please input an amount from 0.0 to 100');
        } else {
            imgPercent = $('#imgPercentInput').val() / 100;
            $('#imageBar').val($('#inputPercent').val());
            drawImage();
        }
    });



    // file has been entered
    //   check whether it is an image (alert them if it is not)
    $('#file-input').change(function (e) {
        file = e.target.files[0];
        var imageType = /image.*/;

        // make sure that it is an image
        if (!file.type.match(imageType)) {
            alert('The file must be an image... pls try again');
            return;
        }

        // use a file reader
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
    });

    function fileOnload(e) {
        // create img var that will be the image uploaded
        img = $('<img>', {
            src: e.target.result
        });
        img.load(function () {
            htmlImg = this;
            drawImage();
        });
    }

    function drawImage() {
        // make canvas and update its width and height
        var canvas = $('#canvas')[0];
        var ctx = canvas.getContext('2d');
        canvas.width = img[0].width;
        canvas.height = img[0].height;

        // draw the image but much much smaller
        var scaledW = canvas.width * pixelate;
        var scaledH = canvas.height * pixelate;
        ctx.drawImage(htmlImg, 0, 0, scaledW, scaledH);

        // draw the canvas at top left but dont smooth the canvas as we rescale it 
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, img[0].width, img[0].height);

        // update download link's color, href, and make it clickable
        var imgCanvas = canvas.toDataURL();
        $("#downloadLink").css("color", "blue");
        $("#downloadLink").attr('href', imgCanvas);
        $("#downloadLink").attr('download', "8bit-" + file.name);
        downloadLink.addEventListener('click', 'download', false);

        // update canvas dimensions
        $('#canvas').width(parseInt(imgPercent * img[0].width)).height(parseInt(imgPercent * img[0].height));
    }
});