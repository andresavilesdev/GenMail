package com.andresavilesdev.genmail.emailGen.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailGenRequest {

    private String emailContent;
    private String tone;

}
