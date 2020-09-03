package ro.pharmacy.project.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;

@ApiModel("Stock")
public class StockDto extends BaseDto {
	private static final long serialVersionUID = -2089355336514242630L;
	
	@Positive
	private Integer totalQuantity;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String nameOfStock;
	
	@NotNull
	@Positive
	private Long centerId;
	
	@NotNull
	@Positive
	private Long drugId;

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

	public Long getCenterId() {
		return centerId;
	}

	public void setCenterId(Long centerId) {
		this.centerId = centerId;
	}

	public Long getDrugId() {
		return drugId;
	}

	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
}
