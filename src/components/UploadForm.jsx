import { useEffect, useState } from "react";
import config from "../config.json";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebaseSetup";

const ErrorMessage = (props) => {
    return (
        <div className="error-message" style={{ display: props.message.length > 0 ? "block" : "none" }}>
            <p>{props.message}</p>
        </div>
    )
};

const UploadForm = (props) => {
    const [file, setFile] = useState();
    const [isFileSetted, setIsFile] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [category, setCategory] = useState("Aucune");
    const [otherCategory, setOtherCategory] = useState("");
    const [url, setUrl] = useState("");

    function dropHandler(e) {
        e.preventDefault();
        
        const data = e.dataTransfer.items;
        for(let i = 0; i < data.length; i++) {
            if(data[i].kind === "file") {
                const file = data[i].getAsFile();
                setFile(file);
                setIsFile(true);
            }
        }
    }
    function dragOverHandler(e) {
        e.preventDefault();
    }
    function openFolder() {
        const options = {
            multiple: false,
            types: [
                {
                    description: "Seulement les images",
                    accept: {
                        "image/*": ['.png', '.jpeg', '.jpg']
                    }
                }
            ]
        };
        
        window.showOpenFilePicker(options).then((data) => {
            data[0].getFile().then((file) => {
                setFile(file);
                setIsFile(true);
            });
        });
    }

    function handleCategory(e) {
        setCategory(e.target.value);
    }

    function handleOtherCategory(e) {
        setOtherCategory(e.target.value);
    }

    function handleURL(e) {
        setUrl(e.target.value);
    }

    function handleContinue(e) {
        e.preventDefault();

        const data = {
            file: file ? file : null,
            category: otherCategory.length > 0 ? otherCategory : category,
            url: url.length > 0 ? url : null
        }

        return checkForm(data);
    }

    function handleFileSetted(e) {
        setFile();
        setIsFile(false);
        setErrorMessage("");
    }

    function handleUploadType() {
        setFile();
        setIsFile(false);
        setErrorMessage("");
        props.setHaveLink(props.haveLink ? false : true);
    }

    function checkForm(data) {
        if(data.file) {
            let formData = new FormData();

            formData.append('wallpaper', data.file);
            formData.append('category', data.category);

            axios({
                method: "POST",
                url: `${config.API_URL}/image/save`,
                data: formData,
                headers: {
                    "Content-type": "multiplart/form-data"
                }
            }).then((res) => {
                if(res.status === 200) {
                    setErrorMessage("");
                    uploadToDB({ url: res.data.path, category: data.category });
                }
            }).catch((err) => {
                if(err.response.data.message === "ERR_MIMETYPE") {
                    return setErrorMessage("* Seules les images sont autorisés !");
                }
            });
        } else {
            if(props.haveLink) {
                if(url.length >= 1) {
                    setErrorMessage("");
                    uploadToDB(data);
                } else {
                    return setErrorMessage("* Lien invalide !")
                }
            }
        }
    }

    function uploadToDB(data) {
        const ref = collection(db, 'wallpapers');

        if(props.haveLink) {
            try {
                addDoc(ref, { url: data.url, category: data.category });
                setOtherCategory("");
                setUrl("");
                setFile();
                setIsFile(false);
                setCategory("");
            } catch (e) {}
        } else {
            try {
                addDoc(ref, { url: data.url, category: data.category });
                setOtherCategory("");
                setUrl("");
                setFile();
                setIsFile(false);
                setCategory("");
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        console.log(file);
    }, [file])

    return (
        <div className="upload-form">
            <p id="prevent">il vous appartient de respecter la législation en vigueur sur les droits d'auteurs en diffusant ici</p>
            <form method="POST" action="#" id="form-upload" onSubmit={handleContinue} encType="multipart/form-data">
                <h3>Votre image</h3>
                <div className="choose-upload-type">
                    <div 
                        className="with-link upload-type" 
                        style={{ backgroundColor: props.haveLink ? "#D65353" : "#fff", color: props.haveLink ? "#fff" : "#000" }} 
                        onClick={handleUploadType}
                    >J'ai un lien</div>
                    <div 
                        className="with-file upload-type" 
                        style={{ backgroundColor: !props.haveLink ? "#D65353" : "#fff", color: !props.haveLink ? "#fff" : "#000" }} 
                        onClick={handleUploadType}
                    >J'ai un fichier</div>
                </div>
                <div className="inputs">
                    <div className="image">
                        { props.haveLink ? <label htmlFor="img-input">URL de votre image</label> : "" }
                        { props.haveLink 
                            ? <input type="text" name="img-input" id="img-input" placeholder="Tapez ici..." onChange={handleURL} value={url} /> 
                            : <div style={{ display: isFileSetted ? "none" : "flex" }} id="drop_zone" onDrop={dropHandler} onDragOver={dragOverHandler}>
                                <p>Glissez votre fichier ici</p>
                                <a href="#" onClick={openFolder}>ou cliquez-ici pour le choisir</a>
                              </div>
                        }
                        { isFileSetted 
                        ? <div className="file-infos">
                            <p>Image : {file.name}</p>
                            <button type="button" id="change-file" onClick={handleFileSetted}>Changer</button>
                          </div>
                        : ""}
                    </div>

                    <div className="category">
                        <label>Catégorie de votre image</label>
                        <select style={{ display: category === "Autre" ? "none" : "inline-block" }} onChange={handleCategory}>
                            <option value="Aucune">Aucune</option>
                            <option value="Nature">Nature</option>
                            <option value="Paysages urbains">Paysages urbains</option>
                            <option value="Animaux">Animaux</option>
                            <option value="Science-fiction et fantastique">Science-fiction et fantastique</option>
                            <option value="Art abstrait">Art abstrait</option>
                            <option value="Sport">Sport</option>
                            <option value="Cinéma et télévision">Cinéma et télévision</option>
                            <option value="Voyage">Voyage</option>
                            <option value="Automobile et moto">Automobile et moto</option>
                            <option value="Photographie de mode">Photographie de mode</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    
                    <div className="other-category" style={{ display: category === "Autre" ? "flex" : "none" }}>
                        <label htmlFor="other-category-input">Autre</label>
                        <input type="text" placeholder="Votre catégorie" name="other-category-input" value={otherCategory} onChange={handleOtherCategory} />
                    </div>
                
                    <ErrorMessage message={errorMessage} />

                    <div className="continue">
                        <button id="submit" onClick={handleContinue}>Continuer</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default UploadForm;