
import reactLogo from "@/assets/react.svg"
import viteLogo from "/vite.svg"
import { Link } from "react-router"
import { paths } from "@/config/paths"

const HomeRoute = () => {
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
                <div>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </div>
                <div>
                    <Link
                        onMouseEnter={() => {}}
                        to={paths.projects.getHref()}
                    >
                        Go to projects
                    </Link>
                </div>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default HomeRoute
