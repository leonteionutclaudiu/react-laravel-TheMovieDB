import { SpinnerContext } from "../contexts/SpinnerContext"
import { useContext } from "react"

function Spinner() {
    const {showSpinner, setShowSpinner} = useContext(SpinnerContext);

    return (<>
        {showSpinner && <div className="flex justify-center bg-primary rounded-full p-2 items-center fixed right-4 bottom-4">
            <div className="w-16 h-16 border-t-4 border-secondary rounded-full animate-spin"></div>
        </div>}
    </>
    )
}

export default Spinner
