package ro.pharmacy.project.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;

import org.hibernate.validator.constraints.Length;

@Entity
public class Drug extends BaseEntity {
	private static final long serialVersionUID = -9221600902527554238L;

	@Column(name = "NAME", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String name;
	
	@Column(name = "STRENGTH", nullable = false, length = 15)
	@Length(min = 0, max = 15)
	private String strength;
	
	@Column(name = "QUANTITY", nullable = false)
	private Integer quantity;
	
	@Column(name = "PRICE")
	@DecimalMin(value = "2")
	@DecimalMax(value = "20")
	private BigDecimal price;
	
	@Column(name = "DESCRIPTION", nullable = false, length = 120)
	@Length(min = 0, max = 120)
	private String description;
	
	@Column(name = "VALABILITY_TERM")
	private LocalDate valability = LocalDate.now().plusYears(3);
	
	@Column(name = "ENABLED")
	private boolean enabled = true;
	
	@OneToMany(
			mappedBy = "drug",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<SupplierDrug> suppliers = new ArrayList<>();
	
	public Drug() {
		super();
	}

	public Drug(@Length(min = 0, max = 64) String name, @Length(min = 0, max = 15) String strength, Integer quantity,
			@DecimalMin("2") @DecimalMax("3") BigDecimal price, @Length(min = 0, max = 120) String description) {
		super();
		this.name = name;
		this.strength = strength;
		this.quantity = quantity;
		this.price = price;
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getValability() {
		return valability;
	}

	public void setValability(LocalDate valability) {
		this.valability = valability;
	}
	
	public List<SupplierDrug> getSuppliers() {
		return suppliers;
	}

	public void setSuppliers(List<SupplierDrug> suppliers) {
		this.suppliers = suppliers;
	}
	
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Drug drug = (Drug) o;
		return Objects.equals(name, drug.name);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(name);
	}
}
