package com.andresavilesdev.genmail.emailGen.controller;

import com.andresavilesdev.genmail.emailGen.dto.EmailGenRequest;
import com.andresavilesdev.genmail.emailGen.service.EmailGenServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailGenController {

    private final EmailGenServiceImpl emailGenService;

    public EmailGenController(EmailGenServiceImpl emailGenService) {
        this.emailGenService = emailGenService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailGenRequest emailGenRequest) {

        String response = emailGenService.generateEmailResponse(emailGenRequest);

        return ResponseEntity.ok(response);

    }

}
