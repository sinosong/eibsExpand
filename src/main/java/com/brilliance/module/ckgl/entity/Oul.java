package com.brilliance.module.ckgl.entity;
import java.io.Serializable;
import java.util.Date;
import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotations.TableName;
import com.brilliance.module.base.entity.BaseModel;
import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;

@TableName("OUL")
public class Oul extends BaseModel implements Serializable{

	private Long inr;
	//组织机构代码
	private String customercode;
	//统一社会信用代码
	private String creditcode;
	//生效日期
    @JSONField(format="yyyy-MM-dd")
	private Date effectdate;
	//记录状态
	private String state;

    public Long getInr() {
        return inr;
    }

    public void setInr(Long inr) {
        this.inr = inr;
    }

    public String getCustomercode() {
        return customercode;
    }

    public void setCustomercode(String customercode) {
        this.customercode = customercode;
    }

    public String getCreditcode() {
        return creditcode;
    }

    public void setCreditcode(String creditcode) {
        this.creditcode = creditcode;
    }

    public Date getEffectdate() {
        return effectdate;
    }

    public void setEffectdate(Date effectdate) {
        this.effectdate = effectdate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Oul)) return false;
        Oul oul = (Oul) o;
        return Objects.equal(getInr(), oul.getInr()) &&
                Objects.equal(getCustomercode(), oul.getCustomercode()) &&
                Objects.equal(getCreditcode(), oul.getCreditcode()) &&
                Objects.equal(getEffectdate(), oul.getEffectdate()) &&
                Objects.equal(getState(), oul.getState());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getInr(), getCustomercode(), getCreditcode(), getEffectdate(), getState());
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("inr", inr)
                .add("customercode", customercode)
                .add("creditcode", creditcode)
                .add("effectdate", effectdate)
                .add("state", state)
                .toString();
    }
}