package com.brilliance.module.ckgl.controller;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.brilliance.module.ckgl.Service.CkglService;
import com.brilliance.module.ckgl.entity.Oul;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ckgl")
public class CkglConstroller {

    @Autowired
    private CkglService ckglService;

    @RequestMapping(value = "/init",produces ="text/plain;charset=UTF-8")
    @ResponseBody
    public String init(HttpServletRequest request, HttpServletResponse response,@ModelAttribute("offset") int offset,@ModelAttribute("limit") int limit,@ModelAttribute("sort") String sort,@ModelAttribute("order") String order){

//        , @RequestBody Map<String, Object> params
        Map<String, Object> params = new HashMap<String, Object>();

        response.setCharacterEncoding("utf-8");
        //System.out.println(offset+"-"+limit+"-"+sort+"-"+order+"-"+offset/limit);
        String sdate = request.getParameter("sdate");
        String edate = request.getParameter("edate");
        if(null == edate || "".equals(edate)){//添加条件使用索引
            edate = "2100-01-01";
        }
        String customercode = request.getParameter("customercode");
        String creditcode = request.getParameter("creditcode");
        String state = request.getParameter("state");

//        params.put("sdate",sdate);
//        params.put("edate",edate);
        params.put("customercode",customercode);
        params.put("creditcode",creditcode);
        params.put("state",state);
        params.put("sdate",sdate);
        params.put("edate",edate);

        System.out.println("*******************************************");
        System.out.println("params==");
        System.out.println(params);
        System.out.println("*******************************************");

        System.out.println(sdate+"-"+edate+"-"+customercode+"-"+creditcode);

        /*Integer offset = StringUtils.stringToInteger((String) params.get("offset"));
        Integer limit = StringUtils.stringToInteger((String) params.get("limit"));
        String sort = (String)params.get("sort");
        String order = (String)params.get("order");*/

        Page page =new Page(1+offset/limit,limit,sort,"asc".equals(order));
        /*Map condition = new HashMap();
        condition.put("limit",params.get("limit"));
        condition.put("sort",params.get("sort"));
        condition.put("order",params.get("order"));
        condition.put("",params.get(""));
        page.setCondition(condition);*/

        List<Oul> ost = ckglService.initList(page,params);


//        List<Oul> ost = ckglService.initList(sdate,edate,customercode,creditcode,state,1+offset/limit, limit, sort, order);
//        ObjectMapper o = new ObjectMapper();
//        int count =  ckglService.getInitCount(sdate,edate,customercode,creditcode,state);
        String json = "{\n \"total\": " + 10 + ",\n \"rows\":" + JSON.toJSONString(ost) + "\n}";
        //System.out.println(json);
        return json;
    }

}
