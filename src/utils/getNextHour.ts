export function getNextHour(hourfeed: string[]) {
    const agora = new Date();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();

    // Ordenar horários para garantir a ordem correta
    const horariosOrdenados = hourfeed.sort((a, b) => {
        const [horaA, minutoA] = a.split(":").map(Number);
        const [horaB, minutoB] = b.split(":").map(Number);
        if (horaA !== horaB) {
            return horaA - horaB;
        }
        return minutoA - minutoB;
    });


    for (const horario of horariosOrdenados) {
        const [hora, minuto] = horario.split(":").map(Number);
        if (hora > horaAtual || (hora === horaAtual && minuto > minutoAtual)) {
            return horario;
        }
    }

    // Se nenhum horário for encontrado, retorna o primeiro horário do dia seguinte
    return horariosOrdenados[0];
}
