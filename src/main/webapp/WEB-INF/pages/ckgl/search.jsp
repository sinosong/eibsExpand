<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.brilliance.module.base.entity.User" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<base href="<%=basePath%>">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<link rel="Bookmark" type="image/x-icon"  href="resources/images/favicon.ico"/>
	<link rel="icon" type="image/x-icon" href="resources/images/favicon.ico" />
	<link rel="shortcut icon" type="image/x-icon" href="resources/images/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="resources/css/common.css" />
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.min.css" />
    <link rel="stylesheet" href="resources/js/bootstrap-3.3.4/css/bootstrap-table.css">
    <link rel="stylesheet" type="text/css" href="resources/js/bootstrap-3.3.4/css/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" type="text/css" href="resources/js/bootstrap-3.3.4/css/bootstrapValidator.css">
    <link rel="stylesheet" href="resources/js/chosen-1.4.1/chosen.min.css">
	<link rel="stylesheet" href="resources/js/chosen-1.4.1/chosen-bootstrap.css">
	<script src="resources/js/jquery.min.js"></script>
    <script src="resources/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="resources/js/bootstrap-table.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-3.3.4/i18n/bootstrap-table-zh-CN.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-3.3.4/js/bootstrap-datetimepicker.min.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-3.3.4/i18n/bootstrap-datetimepicker.zh-CN.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-3.3.4/js/bootstrapValidator.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-3.3.4/js/jquery.base64.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-3.3.4/js/bootstrap-table-export.js"></script>
	<script type="text/javascript" src="resources/js/bootstrap-3.3.4/js/tableExport.js"></script>
	<script type="text/javascript" src="resources/js/chosen-1.4.1/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/bootbox.min.js"></script>
	<script type="text/javascript" src="resources/js/ckgl/searchInit.js"></script>
	<script type="text/javascript" src="resources/js/ckgl/searchBusiness.js"></script>
	<title>资本映射平台</title>
</head>
<body>

	<div id="wrap">
	<!-- 左侧菜单栏目块 -->
            <div class="leftMeun" id="leftMeun">
                <div id="logoDiv">
                    <p id="logoP"><img id="logo" alt="资本映射平台" src="resources/images/logo.png"><span>资本映射平台</span></p>
                </div>
                <div id="personInfor">
                    <p>
                    	<p><input type="text" id="sysDate" value="" style="border:0px;background:none;width: 100%;" disabled="disabled"/></p>
	                    <c:if test="${empty user}">
						 <p>维护操作需要您登陆！</p><a data-toggle="modal" data-target="#loginMod">点击登陆</a>
						</c:if>
						<c:if test="${!empty user}">
						<p>欢迎您，${user.username}</p> <a onclick="logout()">注销</a>
						</c:if>
                    </p>
                    <input type="hidden" id="userid" name="userid" value="${user.userid}"/>
                </div>
                <div class="meun-item meun-item-active" aria-controls="ser" role="tab" data-toggle="tab">
                	<span onclick="location.reload(true);"><img src="resources/images/icon_user_grey.png">映射查询</span>
                </div>
				<c:if test="${!empty user}">
					<div class="center-block" style="margin-top: 5px;margin-bottom: 5px;">
							<button id="selone" onclick="selone()" class="btn btn-primary" data-toggle="modal" data-target="#seloneMod" data-backdrop="static">
								<i class="	glyphicon glyphicon-search"></i> 单笔
							</button>
							<button id="selall" onclick="selall()" class="btn btn-primary" data-toggle="modal" data-target="#selallMod" data-backdrop="static">
								<i class="glyphicon glyphicon-tasks"></i>&nbsp; 批量
							</button>
					</div>
				</c:if>
                <div class="meun-item meun-item-active">
                	<span onclick="chkSession()"><img src="resources/images/icon_change_grey.png">映射维护<br></span>
                </div>
               	<c:if test="${!empty user}">
	                <div class="center-block" style="margin-top: 5px;margin-bottom: 5px;">
						<button id="insert" onclick="insert()" class="btn btn-primary" data-toggle="modal" data-target="#insertMod" data-backdrop="static">
							<i class="glyphicon glyphicon-plus"></i> 新增
						</button>
						<button id="update" onclick="update()" class="btn btn-primary" data-toggle="modal" data-backdrop="static">
							<i class="glyphicon glyphicon-pencil"></i> 修改
						</button>
	                </div>
				</c:if>
            </div>
  	<!-- 右侧具体内容栏目 -->
	<div id="rightContent">
	          <!-- Tab panes -->
	    <div class="panel-body" style="padding-bottom:0px;">
	        <div class="panel panel-default">
	            <div class="panel-heading">查询面板</div>
	            <div class="panel-body">
	                <form id="formSearch" class="form-horizontal">
	                    <div class="form-group" style="margin-top:15px">
	                    	<label class="control-label col-sm-1" for="txt_search_sdate" style="width: 10%;">起始日期</label>
	                        <div class="col-sm-2">
	                            <input type="text" class="form-control" id="txt_search_sdate" readonly>
	                        </div>
	                        <div class="form-group1">
		                        <label class="control-label col-sm-1" for="txt_search_customercode" style="width: 14%;">组织机构代码</label>
		                        <div class="col-sm-3">
		                            <input type="text" class="form-control" id="txt_search_customercode" name="customercode" maxlength="9" placeholder="9位代码">
		                        </div>
	                        </div>
	                            <label class="control-label col-sm-1" for="txt_search_state" style="width: 9%;">状态</label>
		                        <span style="display: inline-block">
                                <select class="form-control" id="txt_search_state">
                                    <option value="">全部</option>
                                    <option value="00">草稿</option>
                                  	<option value="01">待发布</option>
                                  	<option value="02">已发布</option>
                                  	<option value="03">错误</option>
                                </select>
                                </span>
	                     </div>
	                     <div class="form-group" style="margin-top:15px">
	                     	<label class="control-label col-sm-1" for="txt_search_edate" style="width: 10%;">结束日期</label>
	                        <div class="col-sm-2">
	                            <input type="text" class="form-control" id="txt_search_edate" readonly>
	                        </div>
	                        <div class="form-group1">
		                        <label class="control-label col-sm-1" for="txt_search_creditcode" style="width: 14%;">统一社会信用代码</label>
		                        <div class="col-sm-3">
		                            <input type="text" class="form-control" id="txt_search_creditcode" name="creditcode" maxlength="18" placeholder="18位代码">
		                        </div>
	                            <div class="col-sm-1" style="text-align:left;">
	                            	<button type="button" id="btn_reset" class="btn btn-primary" onclick="formReset();" style="margin-left:30px">清空</button>
	                            </div>
		                        <div class="col-sm-1" style="text-align:left;">
	                            	<button type="button" id="btn_query" class="btn btn-primary" style="margin-left:30px">查询</button>
	                            </div>
	                        </div>
	                     </div>
	                </form>
	            </div>
	        </div> 
		</div> 
		<div class="tab-content">
	          <!--用数据模块-->
			<div role="tabpanel" class="tab-pane active">
                <!--  -->
                <div class="panel-collapse collapse in">
					<div class="panel-body" style="padding-top: 0px;">
						<table id="table-list" class="table-condensed" style="margin-top: -15px;overflow: hidden;"></table>
					</div>
				</div>
			</div>		
		</div>
	</div>
  </div>
  <div class="modal fade" style="width: 50%;margin:20px auto;" id="loginMod" tabindex="-1" role="dialog" aria-labelledby="login" aria-hidden="true">
		<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="logintitle">用户登录</h4>
					</div>
					<div class="modal-body">
						<form id="loginform" class="form-horizontal">
							<table border="0" style="width: 100%;">
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">用户名：</td>
									<td><input name="username" type="text" class="form-control  has-success" style="width: 95%; height: 31px" onkeydown="onKeyDown(event)"/> </td>
								</tr>
								<tr height="38px" >
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">密码：</td>
									<td><input name="password" type="password" class="form-control" style="width: 95%; height: 31px" onkeydown="onKeyDown(event)"/></td>
								</tr>
							</table>
						</form>
					</div>
					<div class="modal-footer">
						<span style="color: red">当前仅允许总行用户登录！</span>
						<button name="cancel" id="modal-close" type="button" class="btn btn-default" data-dismiss="modal">取 消</button>
						<button name="login" type="button" class="btn btn-primary">登陆</button>
					</div>
				</div>
		</div>
 </div>
 <div class="modal fade" style="width: 50%;margin:20px auto;" id="insertMod" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
		<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="inserttitle">映射关系新增</h4>
					</div>
					<div class="modal-body">
						<form id="insertform" class="form-horizontal">
							<table border="0" style="width: 100%;">
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">组织机构名称：</td>
									<td><input name="icustomername" type="text" class="form-control  has-success" style="width: 95%; height: 31px" /> </td>
								</tr>
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">组织机构代码：</td>
									<td><input name="icustomercode" type="text" class="form-control  has-success" style="width: 95%; height: 31px" /> </td>
								</tr>
								<tr height="38px" >
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">统一社会信用代码：</td>
									<td><input name="icreditcode" type="text" class="form-control" style="width: 95%; height: 31px" /></td>
								</tr>
							</table>
						</form>
					</div>
					<div class="modal-footer">
						<span style="color: red">请注意，此操作无法撤回！</span>
						<button name="cancel" id="modal-close" type="button" class="btn btn-default" data-dismiss="modal">取 消</button>
						<button name="insert" type="button" class="btn btn-primary">保存</button>
					</div>
				</div>
		</div>
 </div>
  <div class="modal fade" style="width: 50%;margin:20px auto;" id="updateMod" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
		<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="updatetitle">映射关系修改</h4>
					</div>
					<div class="modal-body">
						<form id="updateform" class="form-horizontal">
							<table border="0" style="width: 100%;">
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">组织机构名称：</td>
									<td><input name="ucustomername" type="text" class="form-control  has-success" style="width: 95%; height: 31px" /> </td>
								</tr>
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">组织机构代码：</td>
									<td><input name="ucustomercode" type="text" class="form-control  has-success" style="width: 95%; height: 31px" /> </td>
								</tr>
								<tr height="38px" >
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">统一社会信用代码：</td>
									<td><input name="ucreditcode" type="text" class="form-control" style="width: 95%; height: 31px" /></td>
								</tr>
							</table>
						</form>
					</div>
					<div class="modal-footer">
						<span style="color: red">请注意，此操作无法撤回！</span>
						<button name="cancel" id="modal-close" type="button" class="btn btn-default" data-dismiss="modal">取 消</button>
						<button name="update" type="button" class="btn btn-primary">保存</button>
					</div>
				</div>
		</div>
 </div>
  <div class="modal fade" style="width: 50%;margin:20px auto;" id="seloneMod" tabindex="-1" role="dialog" aria-labelledby="selone" aria-hidden="true">
		<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="selonetitle">映射关系实时查询</h4>
					</div>
					<div class="modal-body">
						<form id="seloneform" class="form-horizontal">
							<table border="0" style="width: 100%;">
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">组织机构代码：</td>
									<td><input id="seloneInput" name="dcustomercode" type="text" class="form-control  has-success" style="width: 95%; height: 31px" /> </td>
								</tr>
							</table>
						</form>
					</div>
					<div class="modal-footer">
						<button name="cancel" id="modal-close" type="button" class="btn btn-default" data-dismiss="modal">取 消</button>
						<button name="selone" type="button" class="btn btn-primary">查询</button>
					</div>
				</div>
		</div>
 </div>
   <div class="modal fade" style="width: 50%;margin:20px auto;" id="selallMod" tabindex="-1" role="dialog" aria-labelledby="selall" aria-hidden="true">
		<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="selalltitle">批量查询</h4>
					</div>
					<div class="modal-body">
						<form id="selallform" class="form-horizontal">
							<table border="0" style="width: 100%;">
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">生效日期：</td>
									<td><input name="selalldate" type="text" class="form-control form_datetime" style="width: 95%; height: 31px" readonly></td>
								</tr>
							</table>
						</form>
					</div>
					<div class="modal-footer">
						<button name="cancel" id="modal-close" type="button" class="btn btn-default" data-dismiss="modal">取 消</button>
						<button name="selall" type="button" class="btn btn-primary">查询</button>
					</div>
				</div>
		</div>
 </div>
  <div class="modal fade" style="width: 50%;margin:20px auto;" id="selones" tabindex="-1" role="dialog" aria-labelledby="selones" aria-hidden="true">
		<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title" id="selonestitle">查询结果</h4>
					</div>
					<div class="modal-body">
						<form id="selonesform" class="form-horizontal">
							<table border="0" style="width: 100%;">
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">组织机构名称：</td>
									<td><input readonly name="cuname" type="text" class="form-control  has-success" style="width: 95%; height: 31px" /> </td>
								</tr>
								<tr height="38px">
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">组织机构代码：</td>
									<td><input readonly name="cucode" type="text" class="form-control  has-success" style="width: 95%; height: 31px" /> </td>
								</tr>
								<tr height="38px" >
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">统一社会信用代码：</td>
									<td><input readonly name="crcode" type="text" class="form-control" style="width: 95%; height: 31px" /></td>
								</tr>
								<tr height="38px" >
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">发布状态：</td>
									<td><input readonly name="stat" type="text" class="form-control" style="width: 95%; height: 31px" /></td>
								</tr>
								<tr height="38px" >
									<td style="font-weight: normal; width: 35%; vertical-align: middle; text-align: right;">生效日期：</td>
									<td><input readonly name="efdate" type="text" class="form-control" style="width: 95%; height: 31px" /></td>
								</tr>
							</table>
						</form>
					</div>
					<div class="modal-footer"></div>
				</div>
		</div>
 </div>
</body>
</html>