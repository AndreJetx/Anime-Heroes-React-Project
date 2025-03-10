import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import Image from "next/image";




export default function CharacterPage() {
    const { t } = useTranslation();

    return(
        <>
            <Header animeList={[]} selectedAnime="" onSelectAnime={() => {}} />
            
            <div className="guide-container">   
                <div className="characters">
                    <div className="characters-title">
                        <h1>{t("navcharacters")}</h1>
                        <p>{t("characterguidetext")}</p>
                    </div>

                    <div className="character-types">
                        <div className="character-types-card">
                            <Image
                            src="/images/common.png"
                            alt="common character"
                            width={200}
                            height={200}
                            />
                            <h3>{t("commoncharacter")}</h3>
                            <p>{t("commoncharacterdescription")}</p>
                        </div>
                        <div className="character-types-card">
                            <Image
                            src="/images/extra.png"
                            alt="common character"
                            width={200}
                            height={200}
                            />
                            <h3>{t("extracharacter")}</h3>
                            <p>{t("extracharacterdescription")}</p>
                        </div><div className="character-types-card">
                            <Image
                            src="/images/elites+.png"
                            alt="common character"
                            width={200}
                            height={200}
                            />
                            <h3>{t("elitecharacter")}</h3>
                            <p>{t("eliteharacterdescription")}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1>{t("unlockablecharacters")}</h1>
                            <p>{t("unlockablecharacterstext")}</p>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
                <Footer />
            </div>

        </>
    )

}