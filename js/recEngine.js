function showHint(str) {
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("txtHint").innerHTML = this.responseText;
				jsonObj = JSON.parse(this.responseText);
				initPath = "https://image.tmdb.org/t/p/w500";
				document.getElementById("mov1").src = initPath + jsonObj.results[0].poster_path;
				document.getElementById("mov2").src = initPath + jsonObj.results[1].poster_path;
				document.getElementById("mov3").src = initPath + jsonObj.results[2].poster_path;
				document.getElementById("mov4").src = initPath + jsonObj.results[3].poster_path;
            }
        };
        xmlhttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=b7170a0e70fb4aa9dd4e629d2767aab3&query=" + str, true);
        xmlhttp.send();
    }
}