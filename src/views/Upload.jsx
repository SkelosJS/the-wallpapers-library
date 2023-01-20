import "../css/Upload.css";
import "../css/UploadForm.css";
import { useState } from "react";

// Components
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import UploadRender from "../components/UploadRender";

const Upload = () => {
    const [haveLink, setHaveLink] = useState(true);
    const [isContinue, setIsContinue] = useState(false);

    return (
        <>
            <Navbar />
            <div className="upload">
                <div className="subtitle">
                    <h2>Poster votre image</h2>
                </div>
                { !isContinue ? <UploadForm setHaveLink={setHaveLink} haveLink={haveLink} /> : <UploadRender /> }
            </div>
        </>
    )
}

export default Upload;