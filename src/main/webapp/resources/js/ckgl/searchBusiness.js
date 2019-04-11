/**
 * 功能(spbBusiness.js)
 */
$(function(){
	
	$("button[name='login']").bind("click",function(){
		var username=$("input[name='username']").val();
		var password=$("input[name='password']").val();
		if(username == null || username == '' || username == undefined){
			bootbox.alert({
				   size :'small',
				   title: "提示",
				   message : '请输入用户名！',
				   className : 'alertw'
			})
			return;
		}
		if(password == null || password == '' || password == undefined){
			bootbox.alert({
				   size :'small',
				   title: "提示",
				   message : '请输入密码！',
				   className : 'alertw'
			})
			return;
		}else{
			var dataForms = $("#loginform").serialize();
			$.ajax({
				  type:"POST",
				  url: 'brilliance/ckgl/login?dateNum='+new Date().getTime()+'',
				  data:dataForms,
				  dataType:"text",
				  success:function(data){
					  if(data == 'success'){
						  bootbox.alert({
							   size :'small',
							   title: "提示",
							   message : '登陆成功！',
							   className : 'alertw',
						       callback:function(){
						    	   var username=$("input[name='username']").val("");
						    	   var password=$("input[name='password']").val("");
								   //$('#loginMod').modal('hide')
								   window.location.reload();
						       }
						   });
					  
					  }else if(data == 'failed'){
						  bootbox.alert({
							   size :'small',
							   title: "失败",
							   message : '请检查您填写的用户名或密码！',
							   className : 'alertw',
						       callback:function(){
						    	   var password=$("input[name='password']").val("");
						    	   $("input[name='password']").focus();
						       }
						   });
					  }else{
						  bootbox.alert({
							   size :'small',
							   title: "错误",
							   message : '未知错误，登陆失败！',
							   className : 'alertw',
						       callback:function(){
						    	   var username=$("input[name='username']").val("");
						    	   var password=$("input[name='password']").val("");
								   $('#loginMod').modal('hide')
						       }
						   });
					  }
				  },
				  error:function(XMLHttpRequest, textStatus, errorThrown){
					  alert(XMLHttpRequest.status);
                      alert(XMLHttpRequest.readyState);
                      alert(textStatus);
				  }
			  })
		}
	});
	
	$("button[name='insert']").bind("click",function(){
		var customername=$("input[name='icustomername']").val();
		var customercode=$("input[name='icustomercode']").val();
		var creditcode=$("input[name='icreditcode']").val();
		if(customername == null || customername == '' || customername == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请输入组织机构名称！',
				   className : 'alertw'
			})
			return;
		}
		if(customercode == null || customercode == '' || customercode == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请输入组织机构代码！',
				   className : 'alertw'
			})
			return;
		}else if(customercode.length!=9 || !orgcodevalidate(customercode)){
			bootbox.alert({
				   size :'small',
				   message : '组织机构代码格式不正确！',
				   className : 'alertw'
			})
			return;
		}
		if(creditcode == null || creditcode == '' || creditcode == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请输入统一社会信用代码！',
				   className : 'alertw'
			})
			return;
		}else if(creditcode.length!=18 || !CheckSocialCreditCode(creditcode)){
			bootbox.alert({
				   size :'small',
				   message : '统一社会信用代码格式不正确！',
				   className : 'alertw'
			})
			return;
		}else{
			$("button[name='insert']").addClass('disabled');
			var dataForms = $("#insertform").serialize();
			$.ajax({
				  type:"POST",
				  url: 'brilliance/whgl/execute?type=add', 
				  data:dataForms,
				  dataType:"text",
				  success:function(data){
					  $("button[name='insert']").removeClass('disabled');
					  if(data == 'success'){
						  bootbox.alert({
							   size :'small',
							   message : '新增成功！',
							   className : 'alertw',
						       callback:function(){
						    	   window.location.reload();
						       }
						   });
					  
					  }else{
						  bootbox.alert({
							   size :'small',
							   message : '新增出错，原因：'+data,
							   className : 'alertw',
						       callback:function(){
						       }
						   });
					  }
				  },
				  error:function(XMLHttpRequest, textStatus, errorThrown){
					  alert(XMLHttpRequest.status);
	                alert(XMLHttpRequest.readyState);
	                alert(textStatus);
				  }
			  })
		}
		
	});
	
	$("button[name='update']").bind("click",function(){
		var customername=$("input[name='ucustomername']").val();
		var customercode=$("input[name='ucustomercode']").val();
		var creditcode=$("input[name='ucreditcode']").val();
		if(customername == null || customername == '' || customername == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请输入组织机构名称！',
				   className : 'alertw'
			})
			return;
		}
		if(customercode == null || customercode == '' || customercode == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请输入组织机构代码！',
				   className : 'alertw'
			})
			return;
		}else if(customercode.length!=9 || !orgcodevalidate(customercode)){
			bootbox.alert({
				   size :'small',
				   message : '组织机构代码格式不正确！',
				   className : 'alertw'
			})
			return;
		}
		if(creditcode == null || creditcode == '' || creditcode == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请输入统一社会信用代码！',
				   className : 'alertw'
			})
			return;
		}else if(creditcode.length!=18 || !CheckSocialCreditCode(creditcode)){
			bootbox.alert({
				   size :'small',
				   message : '统一社会信用代码格式不正确！',
				   className : 'alertw'
			})
			return;
		}else{
			$("button[name='update']").addClass('disabled');
			//后台请求数据
			var dataForms = $("#updateform").serialize();
			$.ajax({
				  type:"POST",
				  url: 'brilliance/whgl/execute?type=ame', 
				  data:dataForms,
				  dataType:"text",
				  success:function(data){
					  $("button[name='update']").removeClass('disabled');
					  if(data == 'success'){
						  bootbox.alert({
							   size :'small',
							   message : '修改成功！',
							   className : 'alertw',
						       callback:function(){
						    	   window.location.reload();
						       }
						   });
					  
					  }else{
						  bootbox.alert({
							   size :'small',
							   message : '修改出错，原因：'+data,
							   className : 'alertw',
						       callback:function(){
						       }
						   });
					  }
				  },
				  error:function(XMLHttpRequest, textStatus, errorThrown){
					  alert("XMLHttpRequest.status: "+XMLHttpRequest.status+" XMLHttpRequest.readyState "+XMLHttpRequest.readyState+" textStatus "+textStatus);
				  }
			  })
			
		}
		
	});
	
	$("button[name='selone']").bind("click",function(){
		var customercode=$("input[name='dcustomercode']").val();
		if(customercode == null || customercode == '' || customercode == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请输入组织机构代码！',
				   className : 'alertw'
			})
			return;
		}else if(customercode.length!=9 || !orgcodevalidate(customercode)){
			bootbox.alert({
				   size :'small',
				   message : '组织机构代码格式不正确！',
				   className : 'alertw'
			})
			return;
		}else{
			$("button[name='selone']").addClass('disabled');
			$.ajax({
				  type:"POST",
				  url: 'brilliance/whgl/execute?type=selone', 
				  data:{customercode:customercode},
				  dataType:"text",
				  success:function(data){
					  $("button[name='selone']").removeClass('disabled');
					  if(null!=data && data != undefined){
						  var selvalue = data.split('|');
						  if(selvalue.length==5){
							  var cucode = selvalue[0];
							  var cuname = selvalue[1];
							  var crcode = selvalue[2];
							  var stat = selvalue[3];
							  if("00"==stat){
								  stat = "草稿";
							  }else if("01"==stat){
								  stat = "待发布";
							  }else if("02"==stat){
								  stat = "已发布"; 
							  }else if("03"==stat){
								  stat = "错误";
							  }
							  var efdate = selvalue[4];
							  $("input[name='cucode']").val(cucode);
							  $("input[name='cuname']").val(cuname);
							  $("input[name='crcode']").val(crcode);
							  $("input[name='stat']").val(stat);
							  $("input[name='efdate']").val(efdate);
							  $('#seloneMod').modal('hide');
							  $("#selones").modal('show');
						  }else{
							  bootbox.alert({
								   size :'small',
								   message : '返回信息异常，详情：'+data,
								   className : 'alertw'
							   });
						  }
						  
					  }else{
						  bootbox.alert({
							   size :'small',
							   message : '返回信息异常，详情：'+data,
							   className : 'alertw'
						   });
					  }
				  },
				  error:function(XMLHttpRequest, textStatus, errorThrown){
					  alert(XMLHttpRequest.status);
	                alert(XMLHttpRequest.readyState);
	                alert(textStatus);
				  }
			  })
		}
		
	});
	
	$("button[name='selall']").bind("click",function(){

		var effectdate=$("input[name='selalldate']").val();
		if(effectdate == null || effectdate == '' || effectdate == undefined){
			bootbox.alert({
				   size :'small',
				   message : '请选择要查询的发布日期',
				   className : 'alertw'
			})
			return;
		}else{
			$("button[name='selall']").addClass('disabled');
			$.ajax({
				  type:"POST",
				  url: 'brilliance/whgl/execute?type=selall', 
				  data:{effectdate:effectdate},
				  dataType:"text",
				  success:function(data){
					  $("button[name='selall']").removeClass('disabled');
					  if(null!=data && data != undefined){
						  bootbox.alert({
							   size :'small',
							   message : data,
							   className : 'alertw'
						   });
					  }else{
						  bootbox.alert({
							   size :'small',
							   message : '返回信息异常，详情：'+data,
							   className : 'alertw'
						   });
					  }
					  $('#selallMod').modal('hide');
				  },
				  error:function(XMLHttpRequest, textStatus, errorThrown){
					  alert(XMLHttpRequest.status);
	                alert(XMLHttpRequest.readyState);
	                alert(textStatus);
				  }
			  })
		}
	});
});

function onKeyDown(event){
	if(event.keyCode==13){
		var username = $("input[name='username']").is(":focus");
		var password = $("input[name='password']").is(":focus");
		if(username || password){
			$("button[name='login']").click();
		}
	}
}

function selall(){
	$("input[name='selalldate']").val("");
	return;
}

function insert(){
	$("input[name='icustomername']").val("");
	$("input[name='icustomercode']").val("");
	$("input[name='icreditcode']").val("");
	return;
}
function selone(){
	$("input[name='dcustomercode']").val("");
	return;
}

function update(){
	$("input[name='ucustomername']").val("");
	var size = $("#table-list").find('tr.success').length;
	if (size == 0) {
		bootbox.alert({
			size : 'small',
			message : '请勾选一条数据修改！',
			className : 'alertw'
		});
	}else{
		var index = $('#table-list').find('tr.success').data('index');//获得选中的行的id
		var perval = $("#table-list").bootstrapTable('getData')[index];
		$("input[name='ucustomercode']").val($(perval)[0].customercode);
		$("input[name='ucreditcode']").val($(perval)[0].creditcode);
		$("#update").attr("data-target","#updateMod");
	}
	return;
}

function logout(){
	//退出登陆，清空session
	$.ajax({
		  type:"POST",
		  url: 'brilliance/ckgl/logout?dateNum='+new Date().getTime()+'',
		  success:function(data){
			  if(data == 'success'){
				  bootbox.alert({
					   size :'small',
					   message : '您已退出登录！',
					   className : 'alertw',
				       callback:function(){
				    	   window.location.reload();
				       }
				   });
			  
			  }else{
				  bootbox.alert({
					   size :'small',
					   message : '未知错误，注销失败！',
					   className : 'alertw',
				       callback:function(){
				    	   window.location.reload();
				       }
				   });
			  }
		  },
		  error:function(XMLHttpRequest, textStatus, errorThrown){
			  alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
		  }
	  })
}