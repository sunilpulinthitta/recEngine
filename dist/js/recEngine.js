// UI thumbnails count.
numDisplay = 6;
// Set this to false if you want to execute the r-code, 
// but you can only search for limited set of movies 
// & computation takes longer
useTMDB = 1; 

window.onload = function() {
  addUIElements();
};

function addUIElements()
{
	for (i = 1; i <= numDisplay; i++)
	{
		$('#searchResults').append('<div class="col-md-2 col-sm-6 hero-feature"><div class="thumbnail"><img id="mov'+i+'" src="http://placehold.it/800x500" alt=""><div class="caption"><h4 id="m'+i+'Title"></h4><p id="m'+i+'Desc" class="show-read-more" style="display:none;"></p><p><i class="fa fa-star" aria-hidden="true" style="vertical-align:middle;font-size:15px;color: gold;"></i>&nbsp;<strong><span id="m'+i+'Rating">0</span></strong><span>/</span><span>10</span></p><p><a id="m'+i+'Viewed" onclick="updateViewedList(this)" href="#" class="btn btn-primary"><i class="fa  fa-eye" title="Watched"></i></a> <a id="m'+i+'Wishlist" onclick="updateWishList(this)" href="#" class="btn btn-default">Add to wishlist</a></p></div></div></div>');
		
		$('#recommendations').append('<div class="col-md-2 col-sm-6 hero-feature"><div class="thumbnail"><img id="rec'+i+'" src="http://placehold.it/800x500" alt=""><div class="caption"><h4 id="r'+i+'Title"></h4><p id="r'+i+'Desc" class="show-read-more" style="display:none;"></p><p><i class="fa fa-star" aria-hidden="true" style="vertical-align:middle;font-size:15px;color: gold;"></i>&nbsp;<strong><span id="r'+i+'Rating">0</span></strong><span>/</span><span>10</span></p><p><a id="r'+i+'Viewed" onclick="updateViewedList(this)" href="#" class="btn btn-primary"><i class="fa  fa-eye" title="Watched"></i></a> <a id="r'+i+'Wishlist" onclick="updateWishList(this)" href="#" class="btn btn-default">Add to wishlist</a></p></div></div></div>');
	} 
}

function searchMovies(str) 
{
    if (str.length == 0) {
        //alert(str);
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() 
		{
            if (this.readyState == 4 && this.status == 200) {
				jsonObj = JSON.parse(this.responseText);
				initPath = "https://image.tmdb.org/t/p/w342";
				
				for(index = 0; index < numDisplay; index++)
				{
					document.getElementById("mov"+(index+1)+"").src = initPath + jsonObj.results[index].poster_path;
				
					document.getElementById("m"+(index+1)+"Title").innerText = jsonObj.results[index].title;
				
					document.getElementById("m"+(index+1)+"Desc").innerText = jsonObj.results[index].overview;
					
					document.getElementById("m"+(index+1)+"Rating").innerText = jsonObj.results[index].vote_average;
					
					$('#m'+(index+1)+'Viewed').data('movieID', jsonObj.results[index].id);
					$('#m'+(index+1)+'Viewed').data('posterPath', initPath + jsonObj.results[index].poster_path);
					$('#m'+(index+1)+'Viewed').data('title', jsonObj.results[index].title);
					$('#m'+(index+1)+'Viewed').data('overview', jsonObj.results[index].overview);
					$('#m'+(index+1)+'Viewed').data('rating', jsonObj.results[index].vote_average);
					
					$('#m'+(index+1)+'Wishlist').data('movieID', jsonObj.results[index].id);
					$('#m'+(index+1)+'Wishlist').data('posterPath', initPath + jsonObj.results[index].poster_path);
					$('#m'+(index+1)+'Wishlist').data('title', jsonObj.results[index].title);
					$('#m'+(index+1)+'Wishlist').data('overview', jsonObj.results[index].overview);
					$('#m'+(index+1)+'Wishlist').data('rating', jsonObj.results[index].vote_average);
					
				}
			
				//getRecommendationsTMDB(jsonObj.results[0].id);
				
				adjustOvervivewTextOnUI();
            }
			
        };
        xmlhttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=b7170a0e70fb4aa9dd4e629d2767aab3&query=" + str, true);
        xmlhttp.send();
    }
}
function getRecommendations()
{
	var movieID = $('#m1Viewed').data('movieID');
	
	if(useTMDB)
	{
		getRecommendationsTMDB(movieID);
	}
	else
	{
		getRecommendationsR(movieID);
	}
}
function getRecommendationsTMDB(movieId)
{
	movieTitle = document.getElementById("m1Title").innerText;
    if (movieTitle.length == 0) {
        //alert(movieTitle);
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) 
			{
				jsonObj = JSON.parse(this.responseText);
				initPath = "https://image.tmdb.org/t/p/w342";
				
				for(index = 0; index < numDisplay; index++)
				{
					document.getElementById("rec"+(index+1)+"").src = initPath + jsonObj.results[index].poster_path;
				
					document.getElementById("r"+(index+1)+"Title").innerText = jsonObj.results[index].title;
				
					document.getElementById("r"+(index+1)+"Desc").innerText = jsonObj.results[index].overview;
					
					document.getElementById("r"+(index+1)+"Rating").innerText = jsonObj.results[index].vote_average;
					
					$('#r'+(index+1)+'Viewed').data('movieID', jsonObj.results[index].id);
					$('#r'+(index+1)+'Viewed').data('posterPath', initPath + jsonObj.results[index].poster_path);
					$('#r'+(index+1)+'Viewed').data('title', jsonObj.results[index].title);
					$('#r'+(index+1)+'Viewed').data('overview', jsonObj.results[index].overview);
					$('#r'+(index+1)+'Viewed').data('rating', jsonObj.results[index].vote_average);
					
					$('#r'+(index+1)+'Wishlist').data('movieID', jsonObj.results[index].id);
					$('#r'+(index+1)+'Wishlist').data('posterPath', initPath + jsonObj.results[index].poster_path);
					$('#r'+(index+1)+'Wishlist').data('title', jsonObj.results[index].title);
					$('#r'+(index+1)+'Wishlist').data('overview', jsonObj.results[index].overview);
					$('#r'+(index+1)+'Wishlist').data('rating', jsonObj.results[index].vote_average);
				}
				
				adjustOvervivewTextOnUI();
            }
        };
        xmlhttp.open("GET", "https://api.themoviedb.org/3/movie/"+ movieId +"/recommendations?api_key=b7170a0e70fb4aa9dd4e629d2767aab3&language=en-US&page=1", true);
		xmlhttp.send();
    }
}

function adjustOvervivewTextOnUI()
{
	var maxLength = 50;
	$(".show-read-more").each(function(){
		var myStr = $(this).text();
		if($.trim(myStr).length > maxLength){
			var newStr = myStr.substring(0, maxLength);
			var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
			$(this).empty().html(newStr);
			$(this).append(' <a href="javascript:void(0);" class="read-more">read more...</a>');
			$(this).append('<span class="more-text" style="display:none">' + removedStr + '</span>');
		}
	});
	$(".read-more").click(function(){
		$(this).siblings(".more-text").contents().unwrap();
		$(this).remove();
		
	});
}

function updateRecommendationsOnUI(movTitle)
{
	movTitle = movTitle.substring(0, movTitle.length - 6);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			jsonObj = JSON.parse(this.responseText);
			initPath = "https://image.tmdb.org/t/p/w500";
			
			for(index = 0; index < 4; index++)
			{
				var movName = document.getElementById("r"+(index+1)+"Title").innerText;
				if (movName.includes(jsonObj.results[0].title))
				{
					document.getElementById("rec"+(index+1)+"").src = initPath + jsonObj.results[0].poster_path;
				
					document.getElementById("r"+(index+1)+"Title").innerText = jsonObj.results[0].title;
				
					document.getElementById("r"+(index+1)+"Desc").innerText = jsonObj.results[0].overview;
					
					document.getElementById("r"+(index+1)+"Rating").innerText = jsonObj.results[index].vote_average;
					
					break;
				}
			}
		}
	};
	xmlhttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=b7170a0e70fb4aa9dd4e629d2767aab3&query=" + movTitle, true);
	xmlhttp.send();
}

function getRecommendationsR() {
	
	movieTitle = document.getElementById("m1Title").innerText;
    if (movieTitle.length == 0) {
        //alert(movieTitle);
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) 
			{
				var arrVal = this.responseText.replace(/"/g, ";").split(";");
				
				var recommendations = [];
				for(index = 4; index < 11; index+=2)
				{
					recommendations.push(arrVal[index]);
				}
				for(index = 0; index < 4; index++)
				{
					document.getElementById("r"+(index+1)+"Title").innerText = recommendations[index];
					if (undefined != recommendations[index])
					{
						updateRecommendationsOnUI(recommendations[index]);
					}
				}
            }
        };
        xmlhttp.open("GET", "getRecommendations.php?movieTitle=" + movieTitle, true);
		xmlhttp.send();
    }
}

function updateViewedList(uiElement)
{
	var movieInfo = [];
	movieInfo.push({"movieID" : $('#'+uiElement.id).data('movieID')});
	movieInfo.push({"posterPath" : $('#'+uiElement.id).data('posterPath')});
	movieInfo.push({"title" : $('#'+uiElement.id).data('title')});
	//movieInfo.push({"overview" : $('#'+uiElement.id).data('overview')});
	movieInfo.push({"rating" : $('#'+uiElement.id).data('rating')});
	
	if (movieInfo == undefined) 
	{
		alert("Empty movieID");
		return;
	} 
	else 
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log(this.responseText);
			}
		};
		userID = localStorage.getItem('userID');
		xmlhttp.open("GET", "updateViewedList.php?userID=" + userID + "&movieInfo=" + JSON.stringify(movieInfo));
		xmlhttp.send();
	}
}

function updateWishList(uiElement)
{
	var movieInfo = [];
	movieInfo.push({"movieID" : $('#'+uiElement.id).data('movieID')});
	movieInfo.push({"posterPath" : $('#'+uiElement.id).data('posterPath')});
	movieInfo.push({"title" : $('#'+uiElement.id).data('title')});
	//movieInfo.push({"overview" : $('#'+uiElement.id).data('overview')});
	movieInfo.push({"rating" : $('#'+uiElement.id).data('rating')});
	
	if (movieInfo == undefined) 
	{
		alert("Empty movieID");
		return;
	} 
	else 
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log(this.responseText);
			}
		};
		userID = localStorage.getItem('userID');
		xmlhttp.open("GET", "updateWishList.php?userID=" + userID + "&movieInfo=" + JSON.stringify(movieInfo));
		xmlhttp.send();
	}
}
