import { APIGatewayProxyHandler } from 'aws-lambda'
import { agendas } from '../mocks/agendas'

export const buscarAgendas: APIGatewayProxyHandler = async (event) => {
  try {
    const medicoId = event.pathParameters?.medicoId

    if (medicoId) {
      const agenda = agendas.find((a) => a.medicoId === medicoId)

      if (!agenda) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Agenda não encontrada para o médico informado.' })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(agenda)
      }
    }

    // Retorna todas as agendas caso nenhum ID seja informado
    return {
      statusCode: 200,
      body: JSON.stringify(agendas)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao buscar agendas.' })
    }
  }
}
