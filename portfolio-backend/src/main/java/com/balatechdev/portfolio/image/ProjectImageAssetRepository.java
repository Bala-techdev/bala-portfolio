package com.balatechdev.portfolio.image;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectImageAssetRepository extends JpaRepository<ProjectImageAsset, Long> {

    List<ProjectImageAsset> findAllByImageUrlIn(Collection<String> imageUrls);
}
