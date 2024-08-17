import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyEmailPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí podrías incluir lógica para mostrar información adicional
        // o realizar alguna acción según sea necesario.
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h2 className="text-white">Please verify your email</h2>
                <p className="text-white">You need to verify your email address before logging in. Please check your inbox for the verification link.</p>
                <button onClick={() => navigate('/register')} className="mt-4 text-blue-500">Back to Register</button>
            </div>
        </div>
    );
}

export default VerifyEmailPage;