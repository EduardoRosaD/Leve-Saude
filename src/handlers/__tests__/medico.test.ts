import { buscarAgendas } from '../medico'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const contextMock = {} as any
const callbackMock = () => {}

describe('buscarAgendas', () => {
  it('deve retornar agenda do médico m1', async () => {
    const event = { pathParameters: { medicoId: 'm1' } } as unknown as APIGatewayProxyEvent

    const response = await buscarAgendas(event, contextMock, callbackMock) as APIGatewayProxyResult

    expect(response.statusCode).toBe(200)
    expect(response.body).toContain('Dra. Ana Silva')
  })

  it('deve retornar 404 se médico não for encontrado', async () => {
    const event = { pathParameters: { medicoId: 'm999' } } as unknown as APIGatewayProxyEvent

    const response = await buscarAgendas(event, contextMock, callbackMock) as APIGatewayProxyResult

    expect(response.statusCode).toBe(404)
    expect(response.body).toContain('não encontrada')
  })

  it('deve retornar todas as agendas se nenhum id for passado', async () => {
    const event = { pathParameters: null } as unknown as APIGatewayProxyEvent

    const response = await buscarAgendas(event, contextMock, callbackMock) as APIGatewayProxyResult

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toBeInstanceOf(Array)
  })
})
