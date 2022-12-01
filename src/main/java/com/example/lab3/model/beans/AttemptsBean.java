package com.example.lab3.model.beans;

import com.example.lab3.entities.Attempt;
import com.example.lab3.model.AttemptsRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.faces.bean.ApplicationScoped;
import jakarta.faces.bean.ManagedBean;
import jakarta.faces.bean.ManagedProperty;
import jakarta.faces.bean.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.primefaces.webapp.UploadedFileCleanerListener;

import java.util.List;

@ManagedBean(name = "attemptsBean")
@ApplicationScoped
public class AttemptsBean {
    private EntityManager entityManager;

    private AttemptsRepository attemptsRepository;

    @PostConstruct
    private void init() {
        this.entityManager = Persistence.createEntityManagerFactory("local").createEntityManager();
        this.attemptsRepository = new AttemptsRepository(this.entityManager);
    }

    @PreDestroy
    private void destroy() {
        this.entityManager.close();
    }

    public void addAttempt(Attempt attempt) {
        this.attemptsRepository.addAttempt(attempt);
    }

    public List<Attempt> getAllAttempts() {
        return this.attemptsRepository.getAllAttempts();
    }

    public Attempt getAttemptById(long attemptId) {
        return this.attemptsRepository.getAttemptById(attemptId);
    }
}
