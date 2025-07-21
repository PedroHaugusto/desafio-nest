import swaggerJSDoc from "swagger-jsdoc";

export const swaggerConfig: swaggerJSDoc.OAS3Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Teste Tecnico",
      description: "Endpoints da API",
      version: "1.0.0", 
    },
    host: "localhost:3000",
    tags: [],
  },
  apis: ["src/docs/*.yaml"],
};