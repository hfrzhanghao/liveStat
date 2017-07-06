// JavaScript Document
$(document).ready(function() {
	$(".listFrame tbody tr:odd").addClass('background');
	
	$(".listFrame tbody tr:even").live("mouseover",function() {
		$(this).addClass('gray');
	}).live("mouseout",function() {
		$(this).removeClass('gray');
	});
	$(".listFrame tbody tr:odd").live("mouseover",function() {
		$(this).addClass('gray');
	}).live("mouseout",function() {
		$(this).addClass('background').removeClass('gray');
	});


	// checkbox全选，反选
	$("input[name='choose']").live("click",function() {
		var $checkboxTag = $("#contentList").find("input:[type='checkbox']");
		// alert($checkboxTag.length);
		var check = $(this).is(":checked");
		$checkboxTag.each(function() {
			$(this).prop("checked", check);
		})
	})

	// 
	function deleteLayersss() {
		$(".layer").show();
		$(".deleteLayer").click(function() {
			$(".deleLayer").show();
		})
		$(".delCancelButton").click(function() {
			$(".deleLayer").hide();
		})
	}
	//删除会议室
	$(".deleteLayer").live("click",function() {
		  var roomid = $(this).attr("dele");
		deleteLayer("删除会议","确定删除?",roomid);
	})

	//删除会议室
	$("#delList").live("click",function() {
		var $checkboxTag = $("#contentList").find("input:[type='checkbox'][name='check'][checked]");
		var ids="";
		$checkboxTag.each(function() {
			ids += $(this).val()+",";
		})
		if(ids != ""){
			deleteLayer("删除会议","确定删除?",ids);
		}else{
			alert("请选择要删除的会议！");
		}
	})
	

	$(".editopenLayer").live("click",function() {
		  var id = $(this).attr("id");
			var name = $(this).attr("name");
			var info = $(this).attr("info");
			var begindate = $(this).attr("begindate");
			var enddate = $(this).attr("enddate");
			var picture = $(this).attr("picture");
			var persons = $(this).attr("persons");
			
			
		editLayer(id,name,info,begindate,enddate,picture,persons);
	})
	
	$("#creatOffice").live("click",function(){
		createLayer();
	});
})

// ===============
// 编辑会议室
var input_save = "<input id=\"saveButton\" class=\"saveButton\" type=\"button\" value=\"添加\" />";
var input_update = "<input id=\"updateButton\" class=\"saveButton\" type=\"button\" value=\"修改\" />";
var edit_tab; // 编辑层
var create_tab; // 创建层
var delete_tab; // 删除
function editLayer(roomid,name,info,begindate,enddate,pict,persons) {
	if (!edit_tab) {
		edit_tab = template_post_form('编辑会议室',
				"<img src='images/listImg.jpg'>", input_update);
		$(document.body).append(edit_tab);

		edit_tab.find(".quit").click(function() {
			edit_tab.hide();
			$(".layer").hide();
		});
		edit_tab.find("#updateButton").click(function() {
			var id = edit_tab.find("#id").val();
			var name = edit_tab.find("#name").val();
			var info = edit_tab.find("#info").val();
			var begindate = edit_tab.find("#begindate").val();
			var enddate = edit_tab.find("#enddate").val();
			var persons = edit_tab.find("#persons").val();
			var endt=checkTime(enddate);
			var stt=checkTime(begindate);
			
			var radios = edit_tab.find(".radio");
			var cpictrue=1;
			for(var i=0;i<10;i++){
				if(radios[i].checked){
					cpictrue=radios[i].value;
				}
			}
			if(name==null||name.trim().length==0){
				alert("用户名不能为空");
			}else if(validate(persons)){
				alert("人数只能是正整数");
			}else if(begindate==null||begindate==""){
				alert("开始时间不能为空");
			}else if(enddate==null||enddate==""){
				alert("结束时间不能为空");
			}else if(endt<=stt){
				alert("结束时间不能不能比开始时间早");
			}else{
				var oldTime = (new Date()).getTime();
				$.ajax({
					type : "post",
					url : "room.uproom.action",
					dataType : "json",
					data : "roomid=" + id + "&pictrue="+cpictrue+"&persons="+persons+"&name=" + encodeURIComponent(name) + "&info=" + encodeURIComponent(info)
							+ "&begindate=" + begindate + "&enddate=" + enddate+"&rtime="+oldTime,
					beforeSend : function() {
					},
					complete : function() {
						$("#updatePane").hide();
					},
					success : function(data) {
						var result = data.result;
						if (result == "0") {
							edit_tab.hide();
							$(".layer").hide();
							meetinglist(typeCache);
						} else if(result == "1"){
							alert("该房间已经不存在！");
						}else if(result == "2"){
							alert("用户名已经存在！");
						}else {
							
							alert("服务器异常了:" + result);
						}
					},
					error : function(request, textStatus, errorThrown) {
						if (request.status == 900) {
							window.location.href = "login.jsp";
						}
					}
				});
			}
		});
	}
	$(".layer").show();
	edit_tab.find("#id").val(roomid);
	edit_tab.find("#name").val(name);
	edit_tab.find("#info").val(info);
	edit_tab.find("#persons").val(persons);
	edit_tab.find("#begindate").val(begindate);
	edit_tab.find("#enddate").val(enddate);
	var dianarray=pict.split(".");
	var penarray = dianarray[dianarray.length-2].split("/");
	picname = penarray[penarray.length-1];
	var pru=edit_tab.find(".radio")[picname-1];
	pru.checked="checked";
	edit_tab.show();
	
}
function deleteLayer(title,msg,id) {
	if (!delete_tab) {
		delete_tab = template_delete_form(title,msg);
		$(document.body).prepend(delete_tab);
		delete_tab.find("#decancelButton").click(function() {
			delete_tab.hide();
			$(".layer").hide();
		});
		delete_tab.find("#desaveButton").click(function() {
			var rommid = delete_tab.find("#id").val();
			$.ajax({
				type : "post",
				url : "room.deletemeeting.action",
				dataType : "json",
				data : "roomids=" + rommid,
				beforeSend : function() {
				},
				complete : function() {
				},
				success : function(data) {
					var result = data.result;
					meetinglist(typeCache);
				},
				error : function(request, textStatus, errorThrown) {
					if (request.status == 900) {
						window.location.href = "login.jsp";
					}
				}
			});
			delete_tab.hide();
			$(".layer").hide();
		});
	}
	$(".layer").show();
	delete_tab.find("#id").val(id);
	delete_tab.show();
}

function createLayer() {
	if (!create_tab) {
		create_tab = template_post_form('创建会议室',
				"<img src='images/currentImg.gif'>",input_save);
		$(document.body).append(create_tab);

		create_tab.find(".quit").click(function() {
			create_tab.hide();
			$(".layer").hide();
		});
		create_tab.find("#saveButton").click(function() {
			var name = create_tab.find("#name").val();
			var info = create_tab.find("#info").val();
			var begindate = create_tab.find("#begindate").val();
			var enddate = create_tab.find("#enddate").val();
			
			var endt=checkTime(enddate);
			var stt=checkTime(begindate);
			
			var persons = create_tab.find("#persons").val();
			var picture = create_tab.find(".radio");
			var cpictrue=1;
			for(var i=0;i<10;i++){
				if(picture[i].checked){
					cpictrue=picture[i].value;
				}
			}
			if(name==null||name.trim().length==0){
				alert("用户名不能为空");
				//create_tab.find("#name").addClass("inputerror");
			}else if(validate(persons)){
				alert("人数只能是正整数");
			} else if(begindate==null||begindate==""){
				alert("开始时间不能为空");
			}else if(enddate==null||enddate==""){
				alert("结束时间不能为空");
			}else if(endt<=stt){
				alert("结束时间不能不能比开始时间早");
			} else{
			$.ajax( {
				type : "post",
				url : "room.addroom.action",
				dataType : "json",
				data : "id="+id+"&pictrue="+cpictrue+"&persons="+persons+"&name="+encodeURIComponent(name)+"&info="+(info)+"&begindate="+encodeURIComponent(begindate)+"&enddate="+encodeURIComponent(enddate),
			    beforeSend:function(){
				},
				complete : function() {
				},
				success : function(data) {
				var result = data.result;
					if (result == "0") {
						create_tab.hide();
						$(".layer").hide();
						meetinglist(typeCache);
					} else{
					if (result == "1") {
						alert("亲，没有空闲的房间了！");
					} else if(result == "2"){
						alert("用户名已经存在！");
					}else{
					alert("服务器异常了"+result);
					}
					}
				},
				error : function(request, textStatus, errorThrown) {
					if (request.status == 900) {
						window.location.href="login.jsp";
					}
				}
			});
		
			}
		});
	}
	$(".layer").show();
	create_tab.show();
}
function validate(value){
    var reg = new RegExp("^[0-9]*$");
 if(!reg.test(value)){
     return true;
 } else if(value<1){
	 return true;
 }
 return false;
}
function template_post_form(title, img, input_cancel) {
	var input_cancel = input_cancel == undefined ? '' : input_cancel;
	var tmp_form = "<div class=\"openLayer editLayer\"><div class=\"layer\"></div> <div class=\"window\">  <h2><img class=\"quit\" src=\"images/quit.gif\" />"
			+ title
			+ "</h2><ul><li><label for=\"mingceng\">会议室名称：</label><input type=\"text\" maxlength='30' id=\"name\" name=\"name\" /></li>   " 
			+"<li><label for=\"number\">描述：</label><input type=\"text\" maxlength='200' id=\"info\" name=\"\" /></li>   " 
			+"<li><label for=\"number\">人数：</label><input type=\"text\" id=\"persons\" maxlength='7' value='100' name=\"\" /></li>   " 
			+"<li><label for=\"begin\">会议开始时间：</label><input type=\"text\" class=\"Wdate\" readonly=\"readonly\" onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" id=\"begindate\" name=\"\" /></li>   " 
			+"<li><label for=\"over\">会议结束时间：</label><input type=\"text\" class=\"Wdate\" readonly=\"readonly\" onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" id=\"enddate\" name=\"\" /></li>" 
			+"<li class=\"haibao\"><input type=\"hidden\" id=\"id\" name=\"id\" /><label for=\"haibao\">会议海报：</label>"
            +"<div class=\"haoBaoImg\">"
			   +"<input class=\"radio\" checked='checked' name='haib' type=\"radio\" value=\"1\"/><img src=\"meetingpic/1.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"2\"/><img src=\"meetingpic/2.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"3\"/><img src=\"meetingpic/3.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"4\"/><img src=\"meetingpic/4.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"5\"/><img src=\"meetingpic/5.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"6\"/><img src=\"meetingpic/6.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"7\"/><img src=\"meetingpic/7.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"8\"/><img src=\"meetingpic/8.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"9\"/><img src=\"meetingpic/9.png\" />"
			   +"<input class=\"radio\" name='haib' type=\"radio\" value=\"10\"/><img src=\"meetingpic/10.png\" />"
			   +"</div>"
			
			
			+ "</li><li class=\"button\">"
			+ input_cancel
			+ "</li></ul></div></div>";
	return $(tmp_form);
}
//删除会议室弹出层开始://
function template_delete_form(title,msg) {
	var tmp_form = "<div class=\"openLayer deleLayer\"><div class=\"layer\"></div> <div class=\"window deleteFrame\">  " +
			"<h2>"+title+"</h2><ul> <p>"+msg+"</p>" +
			"<li class=\"button\"><input type=\"hidden\" id=\"id\" name=\"id\" />" +
			"<input id=\"decancelButton\" class=\"cancelButton delCancelButton\" type=\"reset\" value=\"取消\" /> "+
			"<input id=\"desaveButton\" class=\"saveButton delSaveButton\" type=\"button\" value=\"确定\" />"+
			"</li></ul></div></div>";
	return $(tmp_form);
}
