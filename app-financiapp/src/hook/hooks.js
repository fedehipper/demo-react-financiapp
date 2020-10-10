import { useEffect, useState } from "react";

export function useStateFromProp(valorInicial) {
    const [valor, setValor] = useState(valorInicial);

    useEffect(() => setValor(valorInicial), [valorInicial]);

    return [valor, setValor];
}
