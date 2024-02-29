import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import ChangeIcon from "@mui/icons-material/ChangeCircle";

const Cloudinary = ({ value, children }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { activeimg, setactiveimg, user} = value;

    useEffect(() => {
        if (selectedFile) {
            handleUpload();
        }
    }, [selectedFile]);

    const handleFileChange = async (event) => {
        await setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            if (!selectedFile) {
                console.error("No file selected for upload");
                return;
            }

            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("Content-Type", "multipart/form-data");
            const cloudinaryUploadUrl = `${import.meta.env.VITE_REACT_APP_CLOUDINARY_CALL}`;
            const response = await axios.post(cloudinaryUploadUrl, formData);
            setactiveimg(response.data.secure_url);
            user.profileImg = response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    };

    return (
        <div>
            <label htmlFor="file-input">
                {/* Recieve Children inside label */}
                {children}
            </label>
            <Input
                id="file-input"
                type="file"
                inputProps={{ style: { display: "none" } }}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default Cloudinary;