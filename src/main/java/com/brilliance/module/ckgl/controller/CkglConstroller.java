package com.brilliance.module.ckgl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletResponse;

@Controller
//@RequestMapping(value = "/ckgl")
@RequestMapping
public class CkglConstroller {

    @RequestMapping(value = "/hi",produces ="text/plain;charset=UTF-8")
    @ResponseBody
    public String init(HttpServletResponse response){

        return "hhh";
    }

}
