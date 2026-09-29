package com.balatechdev.portfolio.certificate;

import com.balatechdev.portfolio.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "certificates")
public class Certificate extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 100)
    private String issuer;

    @Column(nullable = false)
    private String url;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(length = 10)
    private String abbr;

    @Column(name = "bg_color", length = 20)
    private String bgColor;

    @Column(name = "fg_color", length = 20)
    private String fgColor;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    protected Certificate() {
        // for JPA
    }

    public Certificate(String title, String issuer, String url, String logoUrl,
                       String abbr, String bgColor, String fgColor, int displayOrder) {
        this.title = title;
        this.issuer = issuer;
        this.url = url;
        this.logoUrl = logoUrl;
        this.abbr = abbr;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
        this.displayOrder = displayOrder;
    }

    public String getTitle() {
        return title;
    }

    public String getIssuer() {
        return issuer;
    }

    public String getUrl() {
        return url;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public String getAbbr() {
        return abbr;
    }

    public String getBgColor() {
        return bgColor;
    }

    public String getFgColor() {
        return fgColor;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void update(String title, String issuer, String url, String logoUrl,
                       String abbr, String bgColor, String fgColor, int displayOrder) {
        this.title = title;
        this.issuer = issuer;
        this.url = url;
        this.logoUrl = logoUrl;
        this.abbr = abbr;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
        this.displayOrder = displayOrder;
    }
}