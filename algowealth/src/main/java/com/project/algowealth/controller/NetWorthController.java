package com.project.algowealth.controller;

import com.project.algowealth.config.JwtUtils;
import com.project.algowealth.dto.NetWorthEntryDTO;
import com.project.algowealth.dto.NetWorthSummaryDTO;
import com.project.algowealth.service.NetWorthService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/networth")
public class NetWorthController {

    @Autowired
    private NetWorthService service;

    @Autowired
    private JwtUtils jwtUtils;

    private String getEmailFromToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.substring(7);
        return jwtUtils.extractEmail(token);
    }

    @GetMapping
    public NetWorthSummaryDTO getSummary(HttpServletRequest req) {
        String email = getEmailFromToken(req);
        return service.getSummary(email);
    }

    @PostMapping
    public NetWorthEntryDTO addEntry(HttpServletRequest req, @RequestBody NetWorthEntryDTO dto) {
        String email = getEmailFromToken(req);
        return service.saveEntry(email, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteEntry(HttpServletRequest req, @PathVariable Long id) {
        String email = getEmailFromToken(req);
        service.deleteEntry(id, email);
        return "Deleted";
    }
}
