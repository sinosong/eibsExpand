package com.brilliance.module.base.mapper;

import com.brilliance.module.base.entity.BizCanvas;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Mapper
@Component(value = "BizCanvasMapper")
public interface BizCanvasMapper extends BaseMapper<BizCanvas> {

    /**
     * 获取截止日期所对应的最新workdate
     * @param endDate
     * @return
     */
    String getMaxWorkDate(@Param("endDate") String endDate);

}
