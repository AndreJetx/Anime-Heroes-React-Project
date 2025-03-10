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
                            alt="Extra character"
                            width={200}
                            height={200}
                            />
                            <h3>{t("extracharacter")}</h3>
                            <p>{t("extracharacterdescription")}</p>
                        </div><div className="character-types-card">
                            <Image
                            src="/images/elites+.png"
                            alt="Elite+ character"
                            width={200}
                            height={200}
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
                        <div className="unlockable-section">
                            <div className="unlockable-card">
                                <Image
                                src="/images/bleachsimbol.png"
                                alt="bleachsimbol"
                                width={200}
                                height={200}
                                />
                                <h2>BLEACH</h2>
                                <table>
                                    <tr>
                                        <th>{t("Unlockable")}</th>
                                        <th>{t("gamemode")}</th>
                                        <th>{t("usedcharacter")}</th>
                                    </tr>
                                    <tr>
                                        <td>Human Ichigo</td>
                                        <td>Arcade</td>
                                        <td>Ichigo</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="unlockable-card">
                                <Image
                                src="/images/esferadbz.png"
                                alt="bleachsimbol"
                                width={200}
                                height={200}
                                />
                                <h2>DRAGON BALL SERIES</h2>
                                <table>
                                    <tr>
                                        <th>{t("Unlockable")}</th>
                                        <th>{t("gamemode")}</th>
                                        <th>{t("usedcharacter")}</th>
                                    </tr>
                                    <tr>
                                        <td>Bardock</td>
                                        <td>Arcade</td>
                                        <td>Goku</td>
                                    </tr>
                                    <tr>
                                        <td>Young Vegeta</td>
                                        <td>Arcade</td>
                                        <td>Vegeta</td>
                                    </tr>
                                    <tr>
                                        <td>Vegetto</td>
                                        <td>Survival</td>
                                        <td>Goku</td>
                                    </tr>
                                    <tr>
                                        <td>Gogeta</td>
                                        <td>Survival</td>
                                        <td>Vegeta</td>
                                    </tr>
                                    <tr>
                                        <td>Mirai Trunks DBZ</td>
                                        <td>Arcade</td>
                                        <td>Trunks DBS</td>
                                    </tr>
                                    <tr>
                                        <td>Young Gohan</td>
                                        <td>Arcade</td>
                                        <td>Gohan</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="unlockable-card">
                                <Image
                                src="/images/bandananaruto.png"
                                alt="bleachsimbol"
                                width={200}
                                height={200}
                                />
                                <h2>NARUTO</h2>
                                <table>
                                    <tr>
                                        <th>{t("Unlockable")}</th>
                                        <th>{t("gamemode")}</th>
                                        <th>{t("usedcharacter")}</th>
                                    </tr>
                                    <tr>
                                        <td>Naruto Hokage</td>
                                        <td>Arcade</td>
                                        <td>Naruto</td>
                                    </tr>
                                </table>
                            </div>
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