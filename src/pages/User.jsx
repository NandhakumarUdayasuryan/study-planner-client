import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { AuthContext } from "../contexts/AuthContext";
import { APIEndpoints } from "../utils/Constants.js";

const User = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    
    const [signUpUser, setSignUpUser] = useState({
        nickname: "",
        email: "",
        password: "",
        age: "",
    });

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [pageType, setPageType] = useState("signin");
    const [isAdmin, setIsAdmin] = useState(false);
    const { setAlertMessage } = useContext(AlertContext);
    const navigate = useNavigate();

    // Fetch tasks from backend
    useEffect(() => {
        console.log("Fetching user from backend...");
        if (isAdmin) {
            axios.get(APIEndpoints.USERS).then((res) => {
                setUsers(res.data);
                console.log("Fetched users:", res.data);
            });
        }
    }, [isAdmin]);

    // handle sign up page
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (
            signUpUser.nickname == "" ||
            signUpUser.email == "" ||
            signUpUser.password == "" ||
            signUpUser.age == ""
        ) {
            setAlertMessage({
                message: `Please enter valid details!`,
                type: "error",
            });
            return;
        }
        const res = await axios.post(APIEndpoints.USERS, signUpUser);
        console.log(res);
        if (res.data.id) {
            setSignUpUser({
                nickname: "",
                email: "",
                password: "",
                age: "",
            });
            setAlertMessage({
                message: `Sign up successfully! Please sign in to continue...`,
                type: "success",
            });
            setPageType("signin");
        } else {
            setAlertMessage({ message: `Invalid user!`, type: "error" });
        }
    };

    // handle signin page

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const authenticate = await axios.post(
                APIEndpoints.LOGIN,
                {
                    email: userEmail,
                    password: userPassword,
                },
                { withCredentials: true }
            );

            setIsAdmin(authenticate.data.isAdmin);

            if (authenticate.data.success) {
                setCurrentUser(authenticate.data);
                setPageType('user-details');
                localStorage.setItem("authToken", authenticate.data.sessionID);
                localStorage.setItem(
                    "authUser",
                    JSON.stringify(authenticate.data.user)
                );
                setTimeout(() => {
                    navigate("/");
                }, 100);
            }
            console.log("authenticate", authenticate);
        } catch {
            setAlertMessage({ message: `Invalid user!`, type: "error" });
        }
    };
    //Switch page type
    const switchPageType = (type) => {
        setPageType(type);
    };
    // Extracted conditional rendering for auth forms
    let authFormContent;
    if (pageType === "signin") {
        authFormContent = (
            <>
                <h1 className="text-xl font-bold px-2">
                    Sign In - Study Planner
                </h1>
                <form className="py-3" onSubmit={handleSignIn}>
                    <div className="p-2">
                        <label className="cursor-pointer" htmlFor="user-email">
                            Email Address
                        </label>
                        <input
                            id="user-email"
                            className="border p-2 mr-2 w-full"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="Enter your Email Address"
                        />
                    </div>
                    <div className="p-2">
                        <label
                            className="cursor-pointer"
                            htmlFor="user-password"
                        >
                            Your Password
                        </label>
                        <input
                            id="user-password"
                            className="border p-2 mr-2 w-full"
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="Enter your Password"
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 m-2 mt-5 cursor-pointer">
                        Sign In
                    </button>
                </form>
                <p className="mt-2 ml-2">
                    Don't have an account?{" "}
                    <button
                        className="text-blue-300 cursor-pointer"
                        type="button"
                        onClick={() => switchPageType("signup")}
                    >
                        Sign up here
                    </button>
                </p>
            </>
        );
    } else if (pageType === "signup") {
        authFormContent = (
            <>
                <h1 className="text-xl font-bold px-2">
                    Sign Up - Study Planner
                </h1>
                <form onSubmit={handleSignUp}>
                    <div className="p-2">
                        <label className="cursor-pointer" htmlFor="new-email">
                            Your Email Address
                        </label>
                        <input
                            id="new-email"
                            className="border p-2 mr-2 w-full"
                            type="email"
                            value={signUpUser.email}
                            onChange={(e) =>
                                setSignUpUser({
                                    ...signUpUser,
                                    email: e.target.value,
                                })
                            }
                            placeholder="Enter your Email Address"
                        />
                    </div>
                    <div className="p-2">
                        <label
                            className="cursor-pointer"
                            htmlFor="new-password"
                        >
                            New Password
                        </label>
                        <input
                            id="new-password"
                            className="border p-2 mr-2 w-full"
                            type="password"
                            value={signUpUser.password}
                            onChange={(e) =>
                                setSignUpUser({
                                    ...signUpUser,
                                    password: e.target.value,
                                })
                            }
                            placeholder="Enter New Password"
                        />
                    </div>
                    <div className="p-2">
                        <label
                            className="cursor-pointer"
                            htmlFor="new-nickname"
                        >
                            New Nickname
                        </label>
                        <input
                            id="new-nickname"
                            className="border p-2 mr-2 w-full"
                            type="text"
                            value={signUpUser.nickname}
                            onChange={(e) =>
                                setSignUpUser({
                                    ...signUpUser,
                                    nickname: e.target.value,
                                })
                            }
                            placeholder="Enter your Nickname"
                        />
                    </div>
                    <div className="p-2">
                        <label className="cursor-pointer" htmlFor="new-age">
                            New Age
                        </label>
                        <input
                            id="new-age"
                            className="border p-2 mr-2 w-full"
                            type="number"
                            value={signUpUser.age}
                            onChange={(e) =>
                                setSignUpUser({
                                    ...signUpUser,
                                    age: e.target.value,
                                })
                            }
                            placeholder="Enter your Age"
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 mt-5 ml-2  cursor-pointer">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 ml-3">
                    Already have an account?{" "}
                    <button
                        className="text-blue-300  cursor-pointer"
                        type="button"
                        onClick={() => switchPageType("signin")}
                    >
                        Sign in here
                    </button>
                </p>
            </>
        );
    } else {
        authFormContent = (
            <div>
                <h1 className="text-xl font-bold px-2">
                    User Details
                </h1>
                <div className="flex">
                    <div>Nick Name</div>
                    <div>{currentUser.nickname}</div>
                </div>
                <div className="flex">
                    <div>Email Address</div>
                    <div>{currentUser.email}</div>
                </div>
                <div className="flex">
                    <div>Age</div>
                    <div>{currentUser.age}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="w-3xs pt-7 m-auto ">{authFormContent}</div>
            {isAdmin ? (
                <ul className="mt-4">
                    {users.map((user) => (
                        <li key={user.id} className="mb-2">
                            ✅ {user.nickname} - {user.age} years old - ( Email
                            Address: {user.email} )
                            <button
                                className="ml-2 bg-red-500 text-white px-2 py-1"
                                onClick={async () => {
                                    await axios.delete(
                                        `${APIEndpoints.USERS}/${user.id}`
                                    );
                                    setUsers(
                                        user.filter((u) => u.id !== user.id)
                                    );
                                }}
                                title="Delete User"
                                aria-label="Delete User"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                ""
            )}
        </div>
    );
};

export default User;
