import { render } from '@testing-library/react-native';
import NavegacionPorDias from "@/src/componentes/contenido/NavegacionPorDias";

describe("Yo como usuario quiero poder ver la fecha desde el navegador de días y poder conocer el clima de hoy, ayer y mañana", () => {
    test("Para el 29 de abril del 2026, el navegador de días debería mostrar 28/4, 29/4 y 30/4", () => {
        const hoy = new Date ('abril 29, 2026');
        const ayer = new Date ('abril 28, 2026');
        const maniana = new Date ('abril 30, 2026');

        const screen = render (<NavegacionPorDias hoy={hoy} maniana={maniana} ayer={ayer}/>);

        expect(screen.getByText("28/4")).toBeOnTheScreen();
        expect(screen.getByText("29/4")).toBeOnTheScreen();
        expect(screen.getByText("30/4")).toBeOnTheScreen();
    })
})