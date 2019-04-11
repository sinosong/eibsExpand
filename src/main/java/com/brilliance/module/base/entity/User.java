package com.brilliance.module.base.entity;

import com.google.common.base.MoreObjects;

import java.io.Serializable;

public class User implements Serializable {

    private String userid;
    private String username;
    private String password;

    public String getUserid() {
        return userid == "" ? null : userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username == "" ? null : username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password == "" ? null : password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("userid", userid)
                .add("username", username)
                .add("password", password)
                .toString();
    }
}
