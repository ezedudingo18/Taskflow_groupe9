const errorResponse = {
  description: 'Erreur',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ErrorResponse' },
    },
  },
};

const validationErrorResponse = {
  description: 'Données invalides',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ValidationErrorResponse' },
    },
  },
};

export const openapiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'TaskFlow API',
    version: '1.0.0',
    description:
      "API REST de gestion des tâches. Les routes protégées utilisent un jeton JWT obtenu via l'endpoint de connexion.",
  },
  servers: [{ url: 'http://localhost:3000', description: 'Développement local' }],
  tags: [
    { name: 'Health', description: "État de l'API" },
    { name: 'Auth', description: 'Inscription et authentification' },
    { name: 'Tasks', description: 'Gestion des tâches' },
    { name: 'Users', description: 'Utilisateur authentifié' },
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: "Vérifier l'état de santé de l'API",
        responses: {
          200: {
            description: 'API opérationnelle',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: { status: { type: 'string', example: 'ok' } },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Créer un compte',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } },
          },
        },
        responses: {
          201: {
            description: 'Compte créé',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['user'],
                  properties: { user: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          400: validationErrorResponse,
          409: errorResponse,
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Se connecter',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } },
          },
        },
        responses: {
          200: {
            description: 'Jeton JWT généré',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['token'],
                  properties: { token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' } },
                },
              },
            },
          },
          400: validationErrorResponse,
          401: errorResponse,
          404: errorResponse,
        },
      },
    },
    '/api/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Lister les tâches de l’utilisateur connecté',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Liste des tâches',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['tasks'],
                  properties: {
                    tasks: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
                  },
                },
              },
            },
          },
          401: errorResponse,
        },
      },
      post: {
        tags: ['Tasks'],
        summary: 'Créer une tâche',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/CreateTaskInput' } },
          },
        },
        responses: {
          201: {
            description: 'Tâche créée',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['task'],
                  properties: { task: { $ref: '#/components/schemas/Task' } },
                },
              },
            },
          },
          400: validationErrorResponse,
          401: errorResponse,
          404: errorResponse,
        },
      },
    },
    '/api/tasks/{taskId}': {
      parameters: [
        {
          name: 'taskId',
          in: 'path',
          required: true,
          description: 'Identifiant MongoDB de la tâche',
          schema: {
            type: 'string',
            pattern: '^[a-fA-F0-9]{24}$',
            example: '507f1f77bcf86cd799439011',
          },
        },
      ],
      patch: {
        tags: ['Tasks'],
        summary: 'Modifier une tâche',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/UpdateTaskInput' } },
          },
        },
        responses: {
          200: {
            description: 'Tâche modifiée',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['task'],
                  properties: { task: { $ref: '#/components/schemas/Task' } },
                },
              },
            },
          },
          400: validationErrorResponse,
          401: errorResponse,
        },
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Supprimer une tâche',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Tâche supprimée',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['task'],
                  properties: { task: { $ref: '#/components/schemas/Task' } },
                },
              },
            },
          },
          400: validationErrorResponse,
          401: errorResponse,
        },
      },
    },
    '/api/users/me': {
      get: {
        tags: ['Users'],
        summary: 'Récupérer le profil connecté',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Profil utilisateur',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['user'],
                  properties: { user: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          401: errorResponse,
          404: errorResponse,
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      User: {
        type: 'object',
        required: ['_id', 'email', 'createdAt', 'updatedAt'],
        properties: {
          _id: {
            type: 'string',
            pattern: '^[a-fA-F0-9]{24}$',
            example: '507f1f77bcf86cd799439011',
          },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Task: {
        type: 'object',
        required: ['_id', 'title', 'status', 'createdAt', 'updatedAt'],
        properties: {
          _id: {
            type: 'string',
            pattern: '^[a-fA-F0-9]{24}$',
            example: '507f1f77bcf86cd799439011',
          },
          title: {
            type: 'string',
            minLength: 1,
            maxLength: 120,
            example: 'Préparer la présentation',
          },
          description: { type: 'string', maxLength: 1000, example: 'Finaliser les slides' },
          status: { type: 'string', enum: ['todo', 'done'], example: 'todo' },
          deadline: { type: 'string', format: 'date-time', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      RegisterInput: {
        type: 'object',
        required: ['email', 'password'],
        additionalProperties: false,
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 8, format: 'password', example: 'password123' },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        additionalProperties: false,
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 1, format: 'password', example: 'password123' },
        },
      },
      CreateTaskInput: {
        type: 'object',
        required: ['title', 'status'],
        additionalProperties: false,
        properties: {
          title: { type: 'string', minLength: 1, maxLength: 120 },
          description: { type: 'string', maxLength: 1000 },
          status: { type: 'string', enum: ['todo', 'done'] },
          deadline: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      UpdateTaskInput: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          title: { type: 'string', minLength: 1, maxLength: 120 },
          description: { type: 'string', maxLength: 1000 },
          status: { type: 'string', enum: ['todo', 'done'] },
          deadline: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      ErrorResponse: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            required: ['message'],
            properties: { message: { type: 'string', example: 'Token manquant' } },
          },
        },
      },
      ValidationErrorResponse: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            required: ['message', 'details'],
            properties: {
              message: { type: 'string', example: 'Données invalides' },
              details: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['field', 'message'],
                  properties: {
                    field: { type: 'string', example: 'email' },
                    message: { type: 'string', example: "L'adresse e-mail est invalide" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
