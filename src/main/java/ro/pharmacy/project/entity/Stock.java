package ro.pharmacy.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.Length;

@Entity
public class Stock extends BaseEntity {
	private static final long serialVersionUID = -3602105953065376903L;
	
	@Column(name = "TOTAL_QUANTITY")
	private Integer totalQuantity;
	
	@Column(name = "NAME_OF_STOCK", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String nameOfStock;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "center_id")
	private Center center;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "drug_id")
	private Drug drug;

	public Stock() {
		super();
	}

	public Stock(Integer totalQuantity, @Length(min = 0, max = 64) String nameOfStock, Center center, Drug drug) {
		super();
		this.totalQuantity = totalQuantity;
		this.nameOfStock = nameOfStock;
		this.center = center;
		this.drug = drug;
	}

	public Integer getTotalQuantity() {
		return totalQuantity;
	}

	public void setTotalQuantity(Integer totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	public String getNameOfStock() {
		return nameOfStock;
	}

	public void setNameOfStock(String nameOfStock) {
		this.nameOfStock = nameOfStock;
	}

	public Center getCenter() {
		return center;
	}

	public void setCenter(Center center) {
		this.center = center;
	}

	public Drug getDrug() {
		return drug;
	}

	public void setDrug(Drug drug) {
		this.drug = drug;
	}
}
