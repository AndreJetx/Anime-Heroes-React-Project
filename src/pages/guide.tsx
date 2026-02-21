import React from "react";
import Footer from "@/components/Footer";
import UnlockablesSection from "@/components/UnlockablesSection";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function GuidePage() {
    const { t } = useTranslation();

    return(
        <>
            <div className="guide-container">   
                <div className="characters">
                    <div className="characters-title">
                        <h1>{t("navguide")}</h1>
                        <p>{t("characterguidetext")}</p>
                    </div>

                    <div className="character-types">
                        <div className="character-types-card">
                            <Image
                            src="/images/common.png"
                            alt="common character"
                            width={130}
                            height={130}
                            />
                            <h3>{t("commoncharacter")}</h3>
                            <p>{t("commoncharacterdescription")}</p>
                        </div>
                        <div className="character-types-card">
                            <Image
                            src="/images/extra.png"
                            alt="Extra character"
                            width={130}
                            height={130}
                            />
                            <h3>{t("extracharacter")}</h3>
                            <p>{t("extracharacterdescription")}</p>
                        </div>
                        <div className="character-types-card">
                            <Image
                            src="/images/elites+.png"
                            alt="Elite+ character"
                            width={130}
                            height={130}
                            />
                            <h3>{t("elitecharacter")}</h3>
                            <p>{t("eliteharacterdescription")}</p>
                        </div>
                    </div>
                    
                    <div className="unlockable">
                        <div className="unlockable-title">
                            <h1>{t("unlockablecharacters")}</h1>
                            <p>{t("unlockablecharacterstext")}</p>
                        </div>
                        <UnlockablesSection />
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}
