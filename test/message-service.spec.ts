import { Test, TestingModule } from '@nestjs/testing';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaService } from '../src/messages/messages.service';

// Grupo de pruebas para el servicio KafkaService
describe('KafkaProducerService', () => {
  let service: KafkaService;
  let clientKafka: ClientKafka;

  // Configurar el entorno de pruebas antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaService,
        {
          provide: 'KAFKA_CLUSTER',
          useValue: {
            connect: jest.fn(),
            send: jest.fn(),
            close: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<KafkaService>(KafkaService);
    clientKafka = module.get<ClientKafka>('KAFKA_CLUSTER');
  });

  // Restablecer todos los mocks después de cada prueba
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Prueba para verificar que el servicio esté definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Prueba para verificar que se desconecta correctamente de Kafka al cerrar la aplicación
  it('should disconnect from Kafka on application shutdown', async () => {
    await service.onApplicationShutdown();

    expect(clientKafka.close).toHaveBeenCalled();
  });

  // Prueba para verificar el manejo de errores al desconectar de Kafka al cerrar la aplicación
  it('should handle errors when disconnecting from Kafka on application shutdown', async () => {
    const error = new Error(
      'Failed to disconnect from Kafka: Failed to disconnect from Kafka',
    );

    (clientKafka.close as jest.Mock).mockRejectedValue(error);

    await expect(service.onApplicationShutdown()).rejects.toMatchObject({
      message: expect.stringContaining('Failed to disconnect from Kafka'),
    });
  });
});
