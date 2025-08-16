
import { useState } from "react"
import reactLogo from "../assets/react.svg"
import viteLogo from "../../public/vite.svg"

const HomeRoute = () => {
    const [count, setCount] = useState(0)
    return (
        <>
            <div className="flex justify-center">
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1 className="">Vite + React</h1>
            <div className="card">
                <button
                    className="mb-5"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </button>
                <div>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </div>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default HomeRoute
