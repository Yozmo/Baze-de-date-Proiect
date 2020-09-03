package ro.pharmacy.project.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;

@ApiModel("Drug")
public class DrugDto extends BaseDto {
	private static final long serialVersionUID = -6189326602016659595L;

	@NotNull
	@Size(min = 0, max = 64)
	private String name;
	
	@NotNull
	@Size(min = 0, max = 15)
	private String strength;
	
	@NotNull
	@Positive
	private Integer quantity;
	
	@NotNull
	@Positive
	private BigDecimal price;
	
	@NotNull
	@Size(min = 0, max = 120)
	private String description;
	
	private LocalDate valability;
	
	private boolean enabled;
	
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

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}	
	
}
