package com.brilliance.module.ckgl.mapper;

import com.brilliance.module.base.mapper.BaseMapper;
import com.brilliance.module.ckgl.entity.Oul;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component(value = "OulMapper")
public interface OulMapper extends BaseMapper<Oul> {


}
