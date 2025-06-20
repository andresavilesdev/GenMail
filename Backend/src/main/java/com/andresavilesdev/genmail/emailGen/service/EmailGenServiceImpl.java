package com.andresavilesdev.genmail.emailGen.service;

import com.andresavilesdev.genmail.emailGen.dto.EmailGenRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.net.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGenServiceImpl implements IEmailGenService{

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;

    public EmailGenServiceImpl(WebClient webClient) {
        this.webClient = webClient;
    }

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

        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
                .retrieve()
                .bodyToMono(String.class)
                .block();


        // EXTRACT RESPONSE ADN RETURN
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            return jsonNode.path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Error processing request: " + e.getMessage();
        }
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
