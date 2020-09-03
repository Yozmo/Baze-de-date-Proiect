package ro.pharmacy.project.dto;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import ro.pharmacy.project.entity.PharmacyType;

@ApiModel("Pharmacy")
public class PharmacyDto extends BaseDto {
	private static final long serialVersionUID = 7920468745756915846L;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String name;
	
	private PharmacyType pharmacyType;
	
	private List<Long> supplierIds;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PharmacyType getPharmacyType() {
		return pharmacyType;
	}

	public void setPharmacyType(PharmacyType pharmacyType) {
		this.pharmacyType = pharmacyType;
	}
	
	public List<Long> getSupplierIds() {
		return supplierIds;
	}

	public void setSupplierIds(List<Long> supplierIds) {
		this.supplierIds = supplierIds;
	}

	@Override
	public String toString() {
		return "PharmacyDto [name=" + name + ", pharmacyType=" + pharmacyType + ", supplierIds=" + supplierIds + "]";
	}	
}
