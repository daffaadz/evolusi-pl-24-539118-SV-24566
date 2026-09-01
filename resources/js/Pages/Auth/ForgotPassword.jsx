import { useState } from "react";
import { Link } from "react-router-dom";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/api/forgot-password", { email });
            setStatus(res.data.message);
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors ?? {});
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            <h1 className="mb-4 text-2xl font-semibold text-gray-900">Forgot Password</h1>
            <p className="mb-4 text-sm text-gray-600">
                Forgot your password? Enter your email and we will send you a reset link.
            </p>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <Link to="/login" className="text-sm text-gray-600 underline hover:text-gray-900">
                        Back to login
                    </Link>
                    <PrimaryButton disabled={processing}>Email Password Reset Link</PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
