package com.example.lab3.model.beans;

import com.example.lab3.entities.Attempt;
import com.example.lab3.entities.Dot;
import jakarta.faces.bean.*;

import java.io.Serializable;
import java.util.List;

@ManagedBean(name = "pageControllerBean")
@RequestScoped
public class PageControllerBean implements Serializable {
    @ManagedProperty(value = "#{attemptsBean}")
    private AttemptsBean attemptsBean;

    @ManagedProperty(value = "#{currentAttemptBean}")
    private CurrentAttemptBean currentAttemptBean;

    @ManagedProperty(value = "#{focusedAttemptBean}")
    private FocusedAttemptBean focusedAttemptBean;

    public void addCurrentAttempt() {
        long startOfProcessing = System.nanoTime();
        Attempt attempt = new Attempt(this.currentAttemptBean.getDot(), startOfProcessing);
        this.attemptsBean.addAttempt(attempt);
        this.focusedAttemptBean.updateFocusedAttempt(attempt.getId());
    }

    public void setAttemptsBean(AttemptsBean attemptsBean) {
        this.attemptsBean = attemptsBean;
    }

    public AttemptsBean getAttemptsBean() {
        return this.attemptsBean;
    }

    public void setCurrentAttemptBean(CurrentAttemptBean currentAttemptBean) {
        this.currentAttemptBean = currentAttemptBean;
    }

    public CurrentAttemptBean getCurrentAttemptBean() {
        return this.currentAttemptBean;
    }

    public void setFocusedAttemptBean(FocusedAttemptBean focusedAttemptBean) {
        this.focusedAttemptBean = focusedAttemptBean;
    }

    public FocusedAttemptBean getFocusedAttemptBean() {
        return this.focusedAttemptBean;
    }
}
