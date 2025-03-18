export const ROLES = {
    ADMIN: "admin",
    USER: "user",
  };
  
  export const PERMISSIONS = {
    PRODUCT: ["create-product", "read-product", "update-product", "delete-product"],
    CATEGORY: ["create-category", "read-category", "update-category", "delete-category"],
    REPORT: ["read-report", "export-report"],
  };
  
  export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
      ...PERMISSIONS.PRODUCT,
      ...PERMISSIONS.CATEGORY,
      ...PERMISSIONS.REPORT,
    ],
    [ROLES.USER]: [
      PERMISSIONS.PRODUCT[1],
      PERMISSIONS.CATEGORY[1],
      PERMISSIONS.REPORT[0],
    ],
  };