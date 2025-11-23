package com.project.algowealth.service;

import com.project.algowealth.dto.TaxRequest;
import com.project.algowealth.dto.TaxResponse;

public class TaxService {

    public static TaxResponse calculateTax(TaxRequest request) {
        double totalIncome = request.getIncome() + request.getOtherIncome();
        double taxableIncome = totalIncome - request.getDeductions();

        if(taxableIncome <= 0) taxableIncome = 0;

        double tax = calculateTaxAmount(taxableIncome);

        return new TaxResponse(taxableIncome, tax);
    }

    public static double calculateTaxAmount(double income) {
        double tax = 0;

        if (income <= 250000) {
            tax = 0; // no tax
        } else if (income <= 500000) {
            tax = 0.05 * (income - 250000); // 5% for 250001 - 500000
        } else if (income <= 1000000) {
            tax = 0.05 * 250000; // 5% slab
            tax += 0.2 * (income - 500000); // 20% slab
        } else {
            tax = 0.05 * 250000; // 5% slab
            tax += 0.2 * 500000; // 20% slab
            tax += 0.3 * (income - 1000000); // 30% slab
        }

        return tax;
    }
}
