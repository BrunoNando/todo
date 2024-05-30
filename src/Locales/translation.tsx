import React, { useState } from "react";

interface TranslationProps {
    translation: {
        pt: Record<string, any>;
        en: Record<string, any>;
    };
    children: (props: { translation: Record<string, any> }) => JSX.Element;
}

export const Translation: React.FC<TranslationProps> = ({ translation, children }) => {
    const [language, setLanguage] = useState('pt');
    const translatedWords = language === "pt" ? translation.pt : translation.en;


    const handleLanguageToggle = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'pt' ? 'en' : 'pt'));
    };


    return (
        <>
            <div className="grid justify-center">
            <div className="py-2 w-full flex justify-start">
                    <button onClick={handleLanguageToggle} className="p-1 w-4 ml-3 absolute rounded-md text-white bg-green-500 shadow-black shadow-md">
                        {language === "pt" ? "English" : "Português"}
                    </button>
                </div>
                <div className="w-screen text-center">
                    {children({ translation: translatedWords })}
                </div>
                
            </div>
        </>
    )
}