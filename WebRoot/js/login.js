//登录
	$("#btlogin").live("click",function(){
		var username = $("#username").val();
		var userpwd = $("#userpwd").val();
		

		$.ajax({
			type : "post",
			url : "login.login.action",
			dataType : "json",
			data : "username=" + username + "&userpwd="+userpwd,
			beforeSend : function() {
			},
			complete : function() {
				
			},
			success : function(data) {
				var result = data.result;
				if (result == "0") {
					/*
					var returnUrl = $("#returnUrl").val();
					//alert(returnUrl);
					if(returnUrl!=undefined&&returnUrl!=null&&returnUrl!==""){
						window.location.href = "count.jsp";
					}else{//session过期后login登陆完再跳转回刚才的页面
						window.location.href = returnUrl;
					}*/
					window.location.href = "count.jsp";
					
				} else {
					var msg="";
					if (result == 10) {
						msg="用户名或密码错误！";
					} 
					
					$('#error_msg').text(msg);
					$('#error_msg').css("display","block");
					$('#btlogin').val('登陆失败');
					return false;
				}
			},
			error : function(request, textStatus, errorThrown) {
				alert(request.status);
				if (request.status == 900) {
					window.location.href = "login.jsp";
				}
			}
		});


	});
