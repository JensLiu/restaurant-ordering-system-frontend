import { CldUploadButton } from "next-cloudinary";
import React, { FC } from "react";
import { BiUpload } from "react-icons/bi";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const uploadPreset = "l0awdgr2";

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
    return (
        <div className="flex flex-col-2 items-center justify-center gap-3">
            <div className="hover:scale-110 transition-transform duration-300">
                <CldUploadButton
                    onUpload={(result: any) => {
                        onChange(result.info.secure_url);
                    }}
                    uploadPreset={uploadPreset}
                >
                    {value ? (
                        <div className="avatar">
                            <div className="w-24 mask mask-squircle">
                                <img src={value} />
                            </div>
                        </div>
                    ) : (
                        <BiUpload className="cursor-pointer" size={32} />
                    )}
                </CldUploadButton>
            </div>
        </div>
    );
};

export default ImageUpload;
