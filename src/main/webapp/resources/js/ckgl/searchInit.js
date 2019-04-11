$(function () {
 
        //初始化Table
        var oTable = new TableInit();
        oTable.Init();
        formCheck();
        console.log("hannasong@brilliance.com.cn");
        
    	$(document).keydown(function(event){
    		if(event.keyCode==13){
    			window.event.returnValue = false;
    		}
    	});
    	
    	$('#table-list').on('click-row.bs.table', function (e, row, element){
    		$('.success').removeClass('success');//去除之前选中的行的，选中样式
    		$(element).addClass('success');//添加当前选中的 success样式用于区别
    		}); 
    	
    	setInterval("document.getElementById('sysDate').value=new Date().toLocaleString()+'  星期'+'日一二三四五六'.charAt(new Date().getDay())",1000); 
        
    });

	var chkSession = function (){
		var strSession = $("#userid").val().toString(); 
	    if( strSession == "")
	    {
	    	bootbox.alert({
				   size :'small',
				   message : '请先登陆！',
				   className : 'alertw'
			})
	       return false;
	     }
	}

//验证组织机构合法性方法  true:组织机构代码是对的
	var orgcodevalidate = function (Code) {
		
		if(Code!="" && Code.length==9){
			var ws = [3, 7, 9, 10, 5, 8, 4, 2];    
            var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';    
            var reg = /^([0-9A-Z]){8}[0-9|X]$/;     
            if (!reg.test(Code)) {    
                return false;    
            }    
            var sum = 0;    
            for (var i = 0; i < 8; i++) {    
                sum += str.indexOf(Code.charAt(i)+'') * ws[i];    
            }    
            var c9 = 11 - (sum % 11);  
            var sc9 = c9+'';  
            if (c9 == 11) {
            	sc9 = '0';    
            } else if (c9 == 10) {
            	sc9 = 'X'  ;  
            }
            return sc9==(Code.charAt(8)+'');
	    }else{
	    	return true;
	    }
	}
	//验证统一社会信用代码合法性方法  true:统一社会信用代码是对的	
	var CheckSocialCreditCode = function (Code) {
		if(Code!='' && Code.length==18){
			var patrn = /^[0-9A-Z]+$/;
			   //18位校验及大写校验
			   if ((Code.length != 18) || (patrn.test(Code) == false)){
				   return false;
			   }else{
				   var Ancode;//统一社会信用代码的每一个值
				   var Ancodevalue;//统一社会信用代码每一个值的权重 
				   var total = 0; 
				   var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
				   var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
				 //不用I、O、S、V、Z 
				   for (var i = 0; i < Code.length - 1; i++) {
					   Ancode = Code.substring(i, i + 1); 
					   Ancodevalue = str.indexOf(Ancode); 
					   total = total + Ancodevalue * weightedfactors[i];
					    //权重与加权因子相乘之和 
				}
			   var logiccheckcode = 31 - total % 31;
			    if (logiccheckcode == 31){
			    	logiccheckcode = 0;
			    }
			    var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
			    var Array_Str = Str.split(',');
			    logiccheckcode = Array_Str[logiccheckcode];
			     var checkcode = Code.substring(17, 18);
			     if (logiccheckcode != checkcode){
			    	 return false;
			     }else{
			    	 return true;
			     }
			   }
		}else{
			return true;
		}
	}
	
	var formReset = function () {
		$('#formSearch')[0].reset();
		$("#formSearch").data('bootstrapValidator').destroy();
		$("#txt_search_sdate").datetimepicker('setEndDate',null);
		$("#txt_search_edate").datetimepicker('setStartDate',null);
		formCheck();
	}
	
	var formCheck = function () {
		//校验
        $('#formSearch').bootstrapValidator({
            message: '查询输入有误',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                customercode: {
                	message: '组织机构代码长度验证失败',
                    validators: {
                        callback: {
                        	message:'组织机构代码不合法,请尝试模糊搜索',
                        	callback:function(value, validator) {
                        		var flag = false;
                                if (orgcodevalidate(value)) {
                                    flag = true;
                                }
                                return flag;  
                            }
                        }
                    }
                },
                creditcode: {
                    validators: {
                        callback: {
                        	message:'统一社会信用代码代码不合法,请尝试模糊搜索',
                        	callback:function(value, validator) {
                        		var flag = false;
                                if (CheckSocialCreditCode(value)) {
                                    flag = true;
                                }
                                return flag;  
                            }
                        }
                    }
                }
            }
        });
	}
	
    var TableInit = function () {
        var oTableInit = new Object();
        //初始化Table
        oTableInit.Init = function () {

        	//先销毁表格  
            $('#table-list').bootstrapTable('destroy');
            //$('#table-list').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:5});
            $('#table-list').bootstrapTable({
                url: 'brilliance/ckgl/init?dateNum='+new Date().getTime()+'',         //请求后台的URL（*）
                method: 'get',                      //请求方式（*）
                toolbar: '#toolbar',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                showRefresh : false,
                sortable: true,                     //是否启用排序
                sortOrder: "desc",                   //排序方式
                sortName : 'effectdate',
                queryParams: oTableInit.queryParams,//传递参数（*）
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,                       //初始化加载第一页，默认第一页
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 25, 50, 100, 500],        //可供选择的每页的行数（*）
                //strictSearch: true,
                clickToSelect: true,                //是否启用点击选中行
                //editable: true,
                showToggle: false,
                showColumns: false,
                showRefresh: false,
                escape: true, //过滤危险字符
                //height: 460,                        //行高，如果没有设置height属性，表格自动根据记录条数觉定表格高度
                uniqueId: "inr",                     //每一行的唯一标识，一般为主键列
                cardView: false,                    //是否显示详细视图
                detailView: false,                   //是否显示父子表
                showExport: true,  //是否显示导出按钮
                exportTypes:['excel','xml','txt'], 
                buttonsAlign:"right",  //按钮位置 
                columns: [
   				       {
							field: 'inr',
							title: '主键',
							halign : 'center',
							align :'center',
							valign : 'center',
							sortable : true ,
							visible : false
						},{
							field: 'effectdate',
							title: '生效日期',
							halign : 'center',
							align :'center',
							valign : 'center',
							width : '15%',
							sortable : true ,
							visible : true
						},{
							field: 'customercode',
							title: '组织机构代码',
							halign : 'center',
							align :'center',
							valign : 'center',
							width : '15%',
							sortable : true ,
							visible : true 
						},{ 
							field: 'creditcode',
							title: '统一社会信用代码',
							halign : 'center',
							align :'center',
							valign : 'center',
							width : '20%',
							sortable : true ,
							visible : true
				      },{
							field: 'state',
							title: '标识',
							halign : 'center',
							align :'center',
							valign : 'center',
							width : '10%',
							sortable : true ,
							visible : true ,
							formatter :function(value,row,index){
								if(null==value||''==value){
									return '空';
								}else{
									if('00'==value){
										return '草稿';
									}else if('01'==value){
										return '待发布';	
									}else if('02'==value){
										return '已发布';	
									}else if('03'==value){
										return '错误';	
									}else{
										return value;
									}
								}
							}
						}
				],
				onLoadSuccess:function(data){
					//alert(JSON.stringify(data));
				},
				onLoadError: function (data) {
					bootbox.alert({
						size :'small',
						message : '数据加载失败！'+JSON.stringify(data),
						className : 'alertw'
					});
                  // alert("数据加载失败！"+JSON.stringify(data));
               }/*,onDblClickCell: function (field, value,row,td) {
                   alert(value);   
               }*/
            });
        };
 
        //得到查询的参数
      oTableInit.queryParams = function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit,   //页面大小
                offset: params.offset,  //页码
                sort: params.sort,
                order: params.order,
                sdate: $("#txt_search_sdate").val(),
                edate: $("#txt_search_edate").val(),
                customercode: $("#txt_search_customercode").val(),
                creditcode: $("#txt_search_creditcode").val(),
                state: $("#txt_search_state").val()
            };
            return temp;
        };
        $(".form_datetime").datetimepicker({
        	minView: "month",//设置只显示到月份
        	format: 'yyyy-mm-dd',
        	autoclose:true,//选中关闭
      		todayBtn: true,
      		language : 'zh-CN'
        });
        
        $("#txt_search_sdate").datetimepicker({
        	minView: "month",//设置只显示到月份
        	format: 'yyyy-mm-dd',
        	autoclose:true,//选中关闭
      		todayBtn: true,
      		language : 'zh-CN'
        }).on('changeDate', function(ev){               
            if(ev.date){  
                $("#txt_search_edate").datetimepicker('setStartDate', new Date(ev.date.valueOf()))  
            }else{  
                $("#txt_search_edate").datetimepicker('setStartDate',null);  
            }  
          });
        
        $("#txt_search_edate").datetimepicker({
        	minView: "month",//设置只显示到月份
        	format: 'yyyy-mm-dd',
        	autoclose:true,//选中关闭
      		todayBtn: true,
      		language : 'zh-CN'
        }).on('changeDate', function(ev){    
            if(ev.date){  
                $("#txt_search_sdate").datetimepicker('setEndDate', new Date(ev.date.valueOf()))  
            }else{  
                $("#txt_search_sdate").datetimepicker('setEndDate',new Date());  
            }   
  
          });
        
        
        $("#btn_query").click(function(){
        	oTableInit.Init();
        });
        
        return oTableInit;
    };