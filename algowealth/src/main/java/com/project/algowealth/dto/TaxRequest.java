package com.project.algowealth.dto;

import lombok.Data;

@Data
public class TaxRequest {
    private double income;
    private double deductions;
    private double otherIncome;
}
