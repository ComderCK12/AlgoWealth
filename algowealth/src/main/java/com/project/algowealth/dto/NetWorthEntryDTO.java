package com.project.algowealth.dto;

import lombok.Data;

@Data
public class NetWorthEntryDTO {
    private Long id;
    private String entryType;
    private String category;
    private String description;
    private Double amount;
}
