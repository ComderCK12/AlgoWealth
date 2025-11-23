package com.project.algowealth.dto;

import lombok.Data;

@Data
public class TaxResponse {
    private double taxableIncome;
    private double taxAmount;

    public TaxResponse(double taxableIncome, double tax) {
        this.taxableIncome = taxableIncome;
        this.taxAmount = tax;
    }
}
