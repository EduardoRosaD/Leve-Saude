import { APIGatewayProxyHandler } from 'aws-lambda'
import { v4 as uuid } from 'uuid'

export const marcarAgendamento: APIGatewayProxyHandler = async (event) => {
  const { pacienteNome, medicoId, horario } = JSON.parse(event.body ?? '{}')

  if (!pacienteNome || !medicoId || !horario) {
    return {
      statusCode: 400,
      body: 'Dados inválidos'
    }
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      agendamentoId: uuid(),
      pacienteNome,
      medicoId,
      horario
    })
  }
}
