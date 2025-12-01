package com.project.algowealth.dto;

import lombok.Data;

import java.util.List;

@Data
public class NetWorthSummaryDTO {
    private List<NetWorthEntryDTO> entries;
    private Double totalAssets;
    private Double totalLiabilities;
    private Double netWorth;
}
