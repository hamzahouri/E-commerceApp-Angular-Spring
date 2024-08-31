package com.wincore.spring_boot_ecommerce.config;

import com.wincore.spring_boot_ecommerce.entity.Product;
import com.wincore.spring_boot_ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;


    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod [] unsuportedActions = {HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PUT};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure( (metadata,httpMethods) -> httpMethods.disable(unsuportedActions))
                .withCollectionExposure( (metadat,httpMethods) -> httpMethods.disable(unsuportedActions));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure( (metadata,httpMethods) -> httpMethods.disable(unsuportedActions))
                .withCollectionExposure( (metadat,httpMethods) -> httpMethods.disable(unsuportedActions));

        //call an internal helper
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids

        //get list of all entity class from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //create an array of entity types
        List<Class> entityClass = new ArrayList<>();

        // get entity type for the entities
        for (EntityType entityType : entities) {
          entityClass.add(entityType.getJavaType());
        }

        // expose the entities ids for the array of entity/domain types
        Class[] domainTypes = entityClass.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
