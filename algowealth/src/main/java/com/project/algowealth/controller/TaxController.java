package com.project.algowealth.controller;

import com.project.algowealth.dto.TaxRequest;
import com.project.algowealth.dto.TaxResponse;
import com.project.algowealth.service.TaxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tax")
public class TaxController {

    @PostMapping("/calculate")
    public ResponseEntity<TaxResponse> calculateTax(@RequestBody TaxRequest taxRequest) {
        System.out.println("Tax came");
        TaxResponse response = TaxService.calculateTax(taxRequest);
        System.out.println("Tax done");
        return ResponseEntity.ok(response);
    }
}
