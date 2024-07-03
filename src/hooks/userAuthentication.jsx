import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();
    const navigate = useNavigate();

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return;
        }
    };

    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            console.log("Tentando fazer login...");
            await signInWithEmailAndPassword(auth, data.email, data.password);
            alert("Login efetuado com sucesso");
            setLoading(false);
            navigate("/");
        } catch (error) {
            alert("Falha no login. Verifique suas credenciais e tente novamente.");

            let systemErrorMessage;
            if (error.code === "auth/user-not-found") {
                systemErrorMessage = "Este usuário não está cadastrado.";
            } else if (error.code === "auth/wrong-password") {
                systemErrorMessage = "Credenciais incorretas.";
            } else {
                systemErrorMessage = "Ocorreu um erro. Tente novamente mais tarde.";
            }

            console.error("Falha no login:", systemErrorMessage);
            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    const logout = async () => {
        checkIfIsCancelled();
        await signOut(auth);
        alert("Usuário deslogado com sucesso.");
        navigate("/");
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        error,
        loading,
        logout,
        login
    };
};

export default useAuthentication;
