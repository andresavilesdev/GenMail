package com.andresavilesdev.genmail.emailGen.service;

import com.andresavilesdev.genmail.emailGen.dto.EmailGenRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailGenServiceImpl implements IEmailGenService{

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Override
    public String generateEmailResponse(EmailGenRequest emailGenRequest) {

        // BUILD THE PROMPT
        String prompt = buildPrompt(emailGenRequest);

        // CRAFT A REQUEST

        Map<String, Object> requestBody = Map.of(
                "contents",new Object[]{
                        Map.of("parts",new Object[]{
                                Map.of("text", prompt),
                        })
                }
        );

        // DO REQUEST AND GET RESPONSE
        // RETURN RESPONSE

        return "";
    }

    @Override
    public String buildPrompt(EmailGenRequest emailGenRequest) {

        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content, please do not generate a subject line");

        if (emailGenRequest.getTone() != null && !emailGenRequest.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailGenRequest.getTone()).append(" tone.");
        }

        prompt.append("\n Original email content:\n").append(emailGenRequest.getEmailContent());

        return prompt.toString();
    }
}
