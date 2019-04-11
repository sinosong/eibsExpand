package com.brilliance.module.ckgl.Service.Impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.brilliance.module.ckgl.Service.CkglService;
import com.brilliance.module.ckgl.entity.Oul;
import com.brilliance.module.ckgl.mapper.OulMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@Service
public class CkglServiceImpl implements CkglService {

    @Autowired
    private OulMapper oulMapper;

    @Override
    public List<Oul> initList(RowBounds rowBounds, Map<String, Object> params) {

        Wrapper<Oul> wrapper = new EntityWrapper<Oul>();
        String customercode = (String) params.get("customercode");
        String creditcode = (String) params.get("creditcode");
        String state = (String) params.get("state");
        String sdate = (String) params.get("sdate");
        String edate = (String) params.get("edate");

        if(StringUtils.isNotBlank(customercode)){
            wrapper.like("CUSTOMERCODE",customercode);
        }
        if(StringUtils.isNotBlank(creditcode)){
            wrapper.like("CREDITCODE",creditcode);
        }
        if(StringUtils.isNotBlank(state)){
            wrapper.eq("STATE",state);
        }
        try {
            if(StringUtils.isNotBlank(sdate)){
                wrapper.ge("EFFECTDATE",DateUtils.parseDate(sdate,"yyyy-MM-dd"));
            }
            if(StringUtils.isNotBlank(edate)){
                wrapper.le("EFFECTDATE",DateUtils.parseDate(edate,"yyyy-MM-dd"));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return oulMapper.selectPage(rowBounds,wrapper);
    }
}
