import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader2 from "./Loader2";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("https://backend-9p1z.onrender.com/users/me",
                    {
                        withCredentials: true,

                    });
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (err) {
                console.log("Not logged in:", err);
            }
        };
        fetchUser();
    }, []);

    const handlePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("picture", file);

            // Upload to backend
            const res = await axios.post(
                "https://backend-9p1z.onrender.com/users/update-picture",
                formData,
                {
                    withCredentials: true, // send token cookie
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            // Update the user's picture in state instantly
            if (res.data.success) {
                setUser((prev) => ({
                    ...prev,
                    picture: res.data.picture,
                }));
                alert("Profile picture updated successfully!");
            } else {
                alert("Failed to update picture");
            }
        } catch (err) {
            console.error("Error uploading picture:", err);
            alert("Something went wrong while uploading");
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.get("https://backend-9p1z.onrender.com/users/logout", { withCredentials: true });

            localStorage.removeItem("token");
            setUser(null);

            setTimeout(() => {
                navigate("/");
                setLoading(false);
            }, 3000);
        } catch (err) {
            console.error("Logout failed:", err);
            setError("Something went wrong while logging out. Please try again.");
            setLoading(false);
        }
    };

   if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader2 />
                <p className="mt-4 text-lg font-medium">Logging out... Please wait.</p>
            </div>
        );
    }


    return (
        <nav className="w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 shadow-lg fixed top-0 left-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo / App Name */}
                <h1
                    className="text-2xl md:text-3xl font-bold text-white tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => navigate("/home")}
                >
                    📝 My Todo App
                </h1>

                {/* Right side (user info or login) */}
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Profile image */}
                        <div className="relative w-15 h-15 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer group">
                            <img
                                src={
                                    user.picture
                                        ? user.picture
                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            user.fullname || "User"
                                        )}&background=random`
                                }
                                alt="user"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay hover effect */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                                Change
                            </div>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePictureChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                title="Upload new profile picture"
                            />
                        </div>

                        {/* Greeting */}
                        <span className="text-white font-medium text-lg">
                            Welcome, <span className="font-semibold">{user.fullname || "User"} 👋</span>
                            {uploading && <p className="text-xs text-gray-500">Uploading...</p>}
                        </span>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-sm"
                        >
                            Logout
                        </button>
                         {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/")}
                        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-sm"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
