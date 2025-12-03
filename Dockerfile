FROM quay.io/keycloak/keycloak:25.0.2

WORKDIR /opt/keycloak

# --- Copy theme provider JAR built by keycloakify ---
# (from build_keycloak, as shown in your VS Code screenshot)
COPY build_keycloak/keycloak-theme-for-kc-25-and-above.jar \
  /opt/keycloak/providers/keycloak-theme.jar



# Pre-build/optimize Keycloak server with PostgreSQL database support
RUN /opt/keycloak/bin/kc.sh build --db=postgres
