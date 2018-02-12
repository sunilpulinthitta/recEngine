window.onload = function() {
  addUIElements();
};

function addUIElements()
{
	// Locals.
	var userID  = localStorage.getItem('userID');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			if(true == this.responseText.includes(';'))
			{
				jsonObjArr = this.responseText.split(';');
				
				for (i = 0; i < jsonObjArr.length; i++)
				{
					jsonObj = JSON.parse(jsonObjArr[i]);
					index = i+1;
					$('#wishList').append('<div class="col-md-2 col-sm-6 hero-feature"><div class="thumbnail"><img id="mov'+index+'" src="'+jsonObj[1].posterPath+'" alt=""><div class="caption"><h3 id="m'+index+'Title">'+jsonObj[2].title+'</h3><p><i class="fa fa-star" aria-hidden="true" style="vertical-align:middle;font-size:20px;color: gold;"></i>&nbsp;<strong><span id="m'+index+'Rating">'+jsonObj[3].rating+'</span></strong><span>/</span><span>10</span></p><p><a id="r'+i+'Viewed" onclick="updateViewedList(this)" href="#" class="btn btn-primary"><i class="fa  fa-eye" title="Watched"></i></a> <a id="r'+i+'Wishlist" onclick="updateWishList(this)" href="#" class="btn btn-default">Remove</a></p></div></div></div>');
					
				} 
			}
			
			adjustOvervivewTextOnUI();
		}
		
	};
	userID = localStorage.getItem('userID');
	xmlhttp.open("GET", "getWishList.php?userID=" + userID);
	xmlhttp.send();
	
}

function adjustOvervivewTextOnUI()
{
	var maxLength = 200;
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
