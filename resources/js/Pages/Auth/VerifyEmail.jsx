import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

export default function VerifyEmail() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.post('/api/email/verification-notification');
            setStatus(res.data.status ?? 'verification-link-sent');
        } catch {
            // handle error
        } finally {
            setProcessing(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
        } catch {
            // ignore
        }
        setUser(null);
        navigate('/login');
    };

    return (
        <GuestLayout>
            <h1 className="mb-4 text-2xl font-semibold text-gray-900">Email Verification</h1>

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn&apos;t receive the email, we will gladly send you
                another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none"
                    >
                        Log Out
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}

