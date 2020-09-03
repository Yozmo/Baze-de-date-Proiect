package ro.pharmacy.project.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@MappedSuperclass
public abstract class BaseEntity implements Serializable {
	private static final long serialVersionUID = -1900968651914166439L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", nullable = false)
	protected Long id;
	
	@Column(name = "CREATED_ON", insertable = true, updatable = false, nullable = false)
	protected LocalDateTime createdOn;
	
	@Column(name = "LAST_MODIFIED_ON", nullable = false)
	protected LocalDateTime lastModifiedOn;
	
	@PrePersist
	void prePersist() {
		this.lastModifiedOn = LocalDateTime.now();
		this.createdOn = LocalDateTime.now();
	}
	
	@PreUpdate
	void preUpdate() {
		this.lastModifiedOn = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public LocalDateTime getLastModifiedOn() {
		return lastModifiedOn;
	}

	public void setLastModifiedOn(LocalDateTime lastModifiedOn) {
		this.lastModifiedOn = lastModifiedOn;
	}
}
