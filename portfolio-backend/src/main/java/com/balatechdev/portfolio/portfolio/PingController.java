package com.balatechdev.portfolio.portfolio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {

    @GetMapping("/api/v1/ping")
    public String ping(){
        return "ok";
    }
}
