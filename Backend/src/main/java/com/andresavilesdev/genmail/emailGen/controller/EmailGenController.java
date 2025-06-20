package com.andresavilesdev.genmail.emailGen.controller;

import com.andresavilesdev.genmail.emailGen.dto.EmailGenRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emailGen")
public class EmailGenController {

    public ResponseEntity<String> generateEmail(@RequestBody EmailGenRequest emailGenRequest) {

        return ResponseEntity.ok("");

    }

}
