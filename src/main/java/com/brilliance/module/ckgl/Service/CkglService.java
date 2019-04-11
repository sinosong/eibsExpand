package com.brilliance.module.ckgl.Service;

import com.brilliance.module.ckgl.entity.Oul;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

public interface CkglService {

    /**
     * 获取List<Oul>
     * @param param 查询条件：起始日期 sdate,终止日期 edate,组织机构代码 customercode,统一社会信用代码 creditcode
     * @param page 当前页码
     * @param rows 每页几条
     * @param sort order by sort
     * @param order asc|desc
     * @return
     */
    public List<Oul> initList(RowBounds rowBounds, Map<String, Object> params);


}
