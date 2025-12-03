FROM quay.io/keycloak/keycloak:25.0.2

WORKDIR /opt/keycloak

# --- Copy theme provider JAR built by keycloakify ---
# (from build_keycloak, as shown in your VS Code screenshot)
COPY build_keycloak/keycloak-theme-for-kc-25-and-above.jar \
  /opt/keycloak/providers/keycloak-theme.jar

# --- Optional: copy raw theme folders (not strictly required, but nice to mirror your dev setup) ---
COPY build_keycloak/theme/gotrust-theme \
  /opt/keycloak/themes/gotrust-theme
COPY build_keycloak/theme/account-v1 \
  /opt/keycloak/themes/account-v1

# Pre-build/optimize Keycloak server with PostgreSQL database support
RUN /opt/keycloak/bin/kc.sh build --db=postgres
