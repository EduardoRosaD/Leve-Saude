import { APIGatewayProxyHandler } from 'aws-lambda'
import { v4 as uuid } from 'uuid'

interface AgendamentoPayload {
  pacienteNome: string
  medicoId: string
  horario: string
}

export const marcarAgendamento: APIGatewayProxyHandler = async (event) => {
  try {
    const { pacienteNome, medicoId, horario } = JSON.parse(event.body ?? '{}') as AgendamentoPayload

    if (!pacienteNome || !medicoId || !horario) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Campos obrigatórios ausentes.' })
      }
    }

    const novoAgendamento = {
      agendamentoId: uuid(),
      pacienteNome,
      medicoId,
      horario
    }

    return {
      statusCode: 201,
      body: JSON.stringify(novoAgendamento)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno ao processar o agendamento.' })
    }
  }
}
