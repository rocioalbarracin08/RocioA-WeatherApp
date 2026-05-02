import { render } from '@testing-library/react-native';
import BotonesDeNavegacionPorDias from "@/src/componentes/contenido/NavegacionPorDias";

jest.mock('lucide-react-native', () => ({
  ChevronLeft: () => null,
  ChevronRight: () => null,
}));

describe("Yo como usuario quiero poder ver la fecha desde el navegador de días y poder conocer el clima de hoy, ayer y mañana", () => {
    test("Para el 29 de abril del 2026, el navegador de días debería mostrar 28/4, 29/4 y 30/4", () => {
        const hoy     = new Date(2026, 3, 29);
        const ayer    = new Date(2026, 3, 28);
        const maniana = new Date(2026, 3, 30);
        const diaIndex = 1;
        const setDiaIndex = jest.fn();

        const screen = render(
            <BotonesDeNavegacionPorDias 
                hoy={hoy} 
                maniana={maniana} 
                ayer={ayer} 
                diaIndex={diaIndex} 
                setDiaIndex={setDiaIndex}
            />
        );

        expect(screen.getByText("28/4")).toBeOnTheScreen();
        expect(screen.getByText("29/4")).toBeOnTheScreen();
        expect(screen.getByText("30/4")).toBeOnTheScreen();
    })
})