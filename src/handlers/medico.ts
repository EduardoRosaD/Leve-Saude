import { APIGatewayProxyHandler } from 'aws-lambda'
import { agendas } from '../mocks/agendas'

export const buscarAgendas: APIGatewayProxyHandler = async (event) => {
  const medicoId = event.pathParameters?.medicoId
  const resultado = medicoId
    ? agendas.find((a) => a.medicoId === medicoId)
    : agendas

  return {
    statusCode: 200,
    body: JSON.stringify(resultado ?? [])
  }
}
