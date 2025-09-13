const { createApp, ref, computed } = Vue

createApp({
  setup() {
    // Datos básicos
    const vhora = ref(0)
    const nhoras = ref(0)

    // Porcentajes de deducción
    const salud = ref(0)
    const pension = ref(0)
    const icbf = ref(0)

    // Aportes y otros
    const prima = ref(0)
    const bonificacion = ref(0)
    const prestamo = ref(0)

    // Tipo de cálculo (% o $)
    const tipoPrima = ref("%")
    const tipoBonificacion = ref("%")
    const tipoPrestamo = ref("$")

    // Cálculos básicos
    const salarioBasico = computed(() => vhora.value * nhoras.value)

    // Deducciones en pesos
    const dedu_salud = computed(() => salarioBasico.value * (salud.value / 100))
    const dedu_pension = computed(() => salarioBasico.value * (pension.value / 100))
    const dedu_icbf = computed(() => salarioBasico.value * (icbf.value / 100))

    const totalDeducciones = computed(() => 
      dedu_salud.value + dedu_pension.value + dedu_icbf.value
    )

    // Aportes en pesos (según tipo)
    const aporte_prima = computed(() => 
      tipoPrima.value === "%" ? salarioBasico.value * (prima.value / 100) : prima.value
    )

    const aporte_bonificacion = computed(() => 
      tipoBonificacion.value === "%" ? salarioBasico.value * (bonificacion.value / 100) : bonificacion.value
    )

    const descuento_prestamo = computed(() => 
      tipoPrestamo.value === "%" ? salarioBasico.value * (prestamo.value / 100) : prestamo.value
    )

    const totalAportes = computed(() => aporte_prima.value + aporte_bonificacion.value)

    // Total a pagar
    const totalPagar = computed(() => 
      salarioBasico.value + totalAportes.value - totalDeducciones.value - descuento_prestamo.value
    )

    // Formato de miles con puntos
    const formatoPesos = (valor) => {
      return valor.toLocaleString("es-CO", { minimumFractionDigits: 0 })
    }

    return {
      vhora, nhoras,
      salud, pension, icbf,
      prima, bonificacion, prestamo,
      tipoPrima, tipoBonificacion, tipoPrestamo,
      salarioBasico,
      dedu_salud, dedu_pension, dedu_icbf,
      totalDeducciones,
      aporte_prima, aporte_bonificacion, descuento_prestamo,
      totalAportes,
      totalPagar,
      formatoPesos
    }
  }
}).mount('#app1')
