/**
 * Calcula uma média ponderada entre três notas
 *
 * @param {number} nota1 Primeira nota, com peso 2
 * @param {number} nota2 Segunda nota, com peso 3
 * @param {number} nota3 Terceira nota, com peso 5
 * @returns {number} A média entre os três valores
 */
function average(nota1, nota2, nota3) {
  let media = (nota1 * 2 + nota2 * 3 + nota3 * 5) / 10;

  //console.log("MEDIA = " + media.toFixed(1));
  return media.toFixed(1);
}

/**
 * Calcula a diferença de tempo entre dois horários
 *
 * @param {number} initialH Hora inicial
 * @param {number} initialM Minuto inicial
 * @param {number} finalH Hora final
 * @param {number} finalM Minuto final
 * @returns {number} Diferença de tempo em minutos
 */
function time_delta(initialH, initialM, finalH, finalM) {
  let deltaH = finalH - initialH;
  let deltaM = finalM - initialM;

  if (deltaH < 0) {
    deltaH = 24 + (finalH - initialH);
  }

  if (deltaM < 0) {
    deltaM = 60 + (finalM - initialM);
    if (deltaH == 0) deltaH = 23;
    else deltaH--;
  }

  if (initialH == finalH && initialM == finalM) {
    //console.log("ESTA PROVA DUROU 24 HORA(S) E 0 MINUTO(S)");
    //return { deltaH: 24, deltaM: 0 };
    return 24 * 60;
  } else {
    //console.log(`ESTA PROVA DUROU ${deltaH} HORA(S) E ${deltaM} MINUTO(S)`);
    //return { deltaH, deltaM };
    return deltaH * 60 + deltaM;
  }
}

module.exports = {
  average,
  time_delta,
};
