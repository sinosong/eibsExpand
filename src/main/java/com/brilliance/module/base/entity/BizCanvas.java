package com.brilliance.module.base.entity;


import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import com.google.common.base.MoreObjects;

import java.io.Serializable;

@TableName("BIZ_CANVAS")
public class BizCanvas extends BaseModel implements Serializable {

    //查询编号
    @TableField("BIZ_CODE")
    private String bizCode;

    //债项事前录入A、债项补录B、审批过程录入S、发放审核F三种
    @TableField("TYPE_")
    private String type;

    //存事中的taskid，补录给1好了，发放审核编号
    @TableField("EXTRA_")
    private String extra;

    //页码,可用于排序
    @TableField("NUM_")
    private Integer num;

    //文件名
    @TableField("FILENAME_")
    private String filename;

    /**
     * 版本号：记录方案变更版本;
     */
    @TableField("VERNUM_")
    private Integer verNum;

    public String getBizCode() {
        return bizCode == "" ? null : bizCode;
    }

    public void setBizCode(String bizCode) {
        this.bizCode = bizCode;
    }

    public String getType() {
        return type == "" ? null : type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getExtra() {
        return extra == "" ? null : extra;
    }

    public void setExtra(String extra) {
        this.extra = extra;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public String getFilename() {
        return filename == "" ? null : filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Integer getVerNum() {
        return verNum;
    }

    public void setVerNum(Integer verNum) {
        this.verNum = verNum;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("id", super.getId_())
                .add("bizCode", bizCode)
                .add("type", type)
                .add("extra", extra)
                .add("num", num)
                .add("filename", filename)
                .add("verNum", verNum)
                .toString();
    }
}
