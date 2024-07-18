var currentIndex = 1;
var audio;
var updateInterval;

$("#ctrl").click(function() {
    playpause();
});

function playpause() {
    if ($("#ctrl").hasClass("fa-pause")) {
        $("#ctrl").removeClass("fa-pause").addClass("fa-play");
        pausesong();
    } else {
        $("#ctrl").removeClass("fa-play").addClass("fa-pause");
        playsong(currentIndex);
    }
}

function playsong(index) {
    var songUrl = "songs/" + index + ".mp3";

    if (audio && audio.src === songUrl) {
        audio.play();
    } else {
        if (audio) {
            audio.pause();
        }
        audio = new Audio(songUrl);

        audio.onloadedmetadata = function() {
            $("#progress").attr("max", audio.duration);
        };

        audio.onended = function() {
            if (currentIndex < 5) {
                currentIndex++;
            } else {
                currentIndex = 1;
            }
            $("#cvr").attr("src", "images/" + currentIndex + ".png");
            updateSongInfo();
            playsong(currentIndex);
        };

        audio.onerror = function() {
            console.error("Error loading audio: " + songUrl);
        };

        audio.play().catch(function(error) {
            console.error("Error playing audio: " + error);
        });
    }

    if (updateInterval) {
        clearInterval(updateInterval);
    }

    updateInterval = setInterval(() => {
        if (audio) {
            $("#progress").val(audio.currentTime);
        }
    }, 500);
}

function pausesong() {
    if (audio) {
        audio.pause();
    }
    if (updateInterval) {
        clearInterval(updateInterval);
    }
}

$("#forward").click(function() {
    if (currentIndex < 5) {
        currentIndex++;
    } else {
        currentIndex = 1;
    }

    $("#cvr").attr("src", "images/" + currentIndex + ".png");
    updateSongInfo();

    playsong(currentIndex);
});

$("#backward").click(function() {
    if (currentIndex > 1) {
        currentIndex--;
    } else {
        currentIndex = 5;
    }

    $("#cvr").attr("src", "images/" + currentIndex + ".png");
    updateSongInfo();

    playsong(currentIndex);
});

function updateSongInfo() {
    switch (currentIndex) {
        case 1:
            $("#songName").text("Middle Child");
            $("#rapper").text("J. Cole");
            break;
        case 2:
            $("#songName").text("All Girls are the Same");
            $("#rapper").text("Juice WRLD");
            break;
        case 3:
            $("#songName").text("Not Like Us");
            $("#rapper").text("Kendrick Lamar");
            break;
        case 4:
            $("#songName").text("Hit 'Em Up");
            $("#rapper").text("2Pac");
            break;
        case 5:
            $("#songName").text("Ni**az in Paris");
            $("#rapper").text("Kanye West and Jay-Z");
            break;
        default:
            break;
    }
}

$("#progress").on("input", function() {
    if (audio) {
        audio.currentTime = this.value;
    }
});
