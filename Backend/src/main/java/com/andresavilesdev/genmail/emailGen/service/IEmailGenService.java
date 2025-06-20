package com.andresavilesdev.genmail.emailGen.service;

import com.andresavilesdev.genmail.emailGen.dto.EmailGenRequest;

public interface IEmailGenService {

    String generateEmailResponse(EmailGenRequest emailGenRequest);

    String buildPrompt(EmailGenRequest emailGenRequest);

}
