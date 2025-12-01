package com.project.algowealth.service;

import com.project.algowealth.dto.NetWorthEntryDTO;
import com.project.algowealth.dto.NetWorthSummaryDTO;
import com.project.algowealth.exception.ResourceNotFoundException;
import com.project.algowealth.model.NetWorthEntry;
import com.project.algowealth.model.User;
import com.project.algowealth.repository.NetWorthRepository;
import com.project.algowealth.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NetWorthService {

    @Autowired
    private NetWorthRepository repo;

    @Autowired
    private UserRepository userRepo;

    public NetWorthSummaryDTO getSummary(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<NetWorthEntry> entries = repo.findByUser(user);

        double assetTotal = entries.stream()
                .filter(e -> e.getEntryType().equalsIgnoreCase("ASSET"))
                .mapToDouble(NetWorthEntry::getAmount)
                .sum();

        double liabilityTotal = entries.stream()
                .filter(e -> e.getEntryType().equalsIgnoreCase("LIABILITY"))
                .mapToDouble(NetWorthEntry::getAmount)
                .sum();

        List<NetWorthEntryDTO> dtoList = entries.stream().map(e -> {
            NetWorthEntryDTO dto = new NetWorthEntryDTO();
            dto.setId(e.getId());
            dto.setEntryType(e.getEntryType());
            dto.setCategory(e.getCategory());
            dto.setDescription(e.getDescription());
            dto.setAmount(e.getAmount());
            return dto;
        }).collect(Collectors.toList());

        NetWorthSummaryDTO summary = new NetWorthSummaryDTO();
        summary.setEntries(dtoList);
        summary.setTotalAssets(assetTotal);
        summary.setTotalLiabilities(liabilityTotal);
        summary.setNetWorth(assetTotal - liabilityTotal);

        return summary;
    }

    public NetWorthEntryDTO saveEntry(String email, NetWorthEntryDTO dto) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        NetWorthEntry entry = new NetWorthEntry();
        entry.setUser(user);
        entry.setEntryType(dto.getEntryType());
        entry.setCategory(dto.getCategory());
        entry.setDescription(dto.getDescription());
        entry.setAmount(dto.getAmount());

        NetWorthEntry saved = repo.save(entry);

        dto.setId(saved.getId());
        return dto;
    }

    public void deleteEntry(Long id, String email) {
        NetWorthEntry entry = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entry not found"));

        if (!entry.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized delete");
        }

        repo.delete(entry);
    }
}