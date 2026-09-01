import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/api/login", data);
            setUser(res.data.user);
            navigate("/dashboard");
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors ?? {});
            } else {
                setStatus("Login failed. Please try again.");
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            <h1 className="mb-6 text-2xl font-semibold text-gray-900">Log in</h1>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        to="/forgot-password"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Forgot your password?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="underline hover:text-gray-900">
                        Register
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
