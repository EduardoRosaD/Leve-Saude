import { marcarAgendamento } from '../agendamento'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

describe('marcarAgendamento', () => {
  it('deve criar um agendamento válido', async () => {
    const event = {
      body: JSON.stringify({
        pacienteNome: 'João da Silva',
        medicoId: 'm1',
        horario: '2025-07-01T09:00:00-03:00'
      })
    } as unknown as APIGatewayProxyEvent

    const response = await marcarAgendamento(
      event,
      {} as any,
      () => {} // função vazia para simular callback
    ) as APIGatewayProxyResult
    

    expect(response.statusCode).toBe(201)
    expect(response.body).toContain('agendamentoId')
  })

  it('deve retornar 400 se faltar dados obrigatórios', async () => {
    const event = {
      body: JSON.stringify({
        pacienteNome: '',
        medicoId: '',
        horario: ''
      })
    } as unknown as APIGatewayProxyEvent

    const response = await marcarAgendamento(event, {} as any, () => {}) as APIGatewayProxyResult
    expect(response.statusCode).toBe(400)
    expect(response.body).toContain('Campos obrigatórios')
  })

  it('deve retornar 500 se o body for inválido', async () => {
    const event = {
      body: '{ json invalido '
    } as unknown as APIGatewayProxyEvent

    const response = await marcarAgendamento(event, {} as any, () => {}) as APIGatewayProxyResult

    expect(response.statusCode).toBe(500)
    expect(response.body).toContain('Erro interno')
  })
})
