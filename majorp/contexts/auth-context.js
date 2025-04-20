// "use client"

// import { createContext, useContext, useState, useEffect } from "react"

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // Fetch current user on initial load
//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const res = await fetch("/api/auth/me")

//         if (res.ok) {
//           const data = await res.json()
//           setUser(data.user)
//         } else {
//           setUser(null)
//         }
//       } catch (error) {
//         console.error("Failed to load user:", error)
//         setUser(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadUser()
//   }, [])

//   // Login function
//   const login = async (email, password) => {
//     setLoading(true)
//     setError(null)

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.error || "Login failed")
//       }

//       setUser(data.user)
//       return data.user
//     } catch (error) {
//       setError(error.message)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Register function
//   const register = async (userData) => {
//     setLoading(true)
//     setError(null)

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.error || "Registration failed")
//       }

//       setUser(data.user)
//       return data.user
//     } catch (error) {
//       setError(error.message)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Logout function
//   const logout = async () => {
//     setLoading(true)

//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//       })

//       setUser(null)
//     } catch (error) {
//       console.error("Logout error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>{children}</AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }

