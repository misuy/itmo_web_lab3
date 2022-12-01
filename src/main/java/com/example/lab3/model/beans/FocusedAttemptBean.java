package com.example.lab3.model.beans;

import com.example.lab3.entities.Attempt;
import jakarta.annotation.PostConstruct;
import jakarta.faces.bean.ManagedBean;
import jakarta.faces.bean.ManagedProperty;
import jakarta.faces.bean.SessionScoped;

@ManagedBean(name="focusedAttemptBean")
@SessionScoped
public class FocusedAttemptBean {
    private Long attemptId;
    private Attempt focusedAttempt;
    @ManagedProperty(value="#{attemptsBean}")
    private AttemptsBean attemptsBean;

    @PostConstruct
    private void init() {
        this.attemptId = null;
        this.focusedAttempt = null;
    }

    public void setAttemptId(long attemptId) {
        this.attemptId = attemptId;
    }

    public long getAttemptId() {
        return this.attemptId;
    }

    public Attempt getFocusedAttempt() {
        return this.focusedAttempt;
    }

    public void setAttemptsBean(AttemptsBean attemptsBean) {
        this.attemptsBean = attemptsBean;
    }

    public AttemptsBean getAttemptsBean() {
        return this.attemptsBean;
    }

    public void updateFocusedAttempt(long attemptId) {
        System.out.println(attemptId);
        this.attemptId = attemptId;
        this.focusedAttempt = this.attemptsBean.getAttemptById(this.attemptId);
    }
}
