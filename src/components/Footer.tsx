import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {

    const { t } = useTranslation();
    const [logoError, setLogoError] = useState(false);

    return(
        <footer className="footer">
            <div className="footer-container">
                <div className="devnav">
                    <div className="devgame">
                        <Image  
                            src="/images/willfooter.png"
                            alt="Martial Artist image"
                            width={500}
                            height={300}
                        />
                        <p>williansandersas@gmail.com</p>
                    </div>
                    <div>
                        <nav className="navfooter">
                            <ul>
                                <li><Link href="/">{t("navhome")}</Link></li>
                                <li><Link href="/#FAQ">FAQ</Link></li>
                                <li><Link href="/#download">{t("navdownload")}</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>    
                <div className="sociallink">
                    <Link href="https://discord.gg/VBctFVAtAJ" target="_blank">
                        <svg className="discord" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M27.4-.4H4.5C2.6-.4 1 1.2 1 3v22.1c0 1.9 1.6 3.4 3.5 3.4H24l-.9-3 2.2 1.9 2 1.8 3.7 3.1V3c-.1-1.8-1.7-3.4-3.6-3.4zm-8.5 7.8zm1.8 13.7s-.6-.7-1.1-1.4c2.2-.6 3.1-1.9 3.1-1.9-.7.5-1.4.7-1.9 1-.8.4-1.7.5-2.5.7-3.9.6-6.1-.4-8.2-1.3l-.7-.4s.8 1.3 3 1.9c-.6.6-1.1 1.4-1.1 1.4-3.9 0-5.3-2.4-5.3-2.4 0-5.3 2.5-9.6 2.5-9.6 2.5-1.8 4.8-1.7 4.8-1.7l.2.2c-3.1.7-4.4 2.1-4.4 2.1l1-.5c4.1-1.6 8.6-1.5 12.8.5 0 0-1.4-1.3-4.3-2.1l.3-.2c.4 0 2.5.1 4.7 1.7 0 0 2.5 4.3 2.5 9.6-.1-.1-1.6 2.3-5.4 2.4z"></path><path d="M19.1 13.4c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zM12.9 13.4c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8c-.1-1-.9-1.8-1.8-1.8z"></path>
                        </svg>
                    </Link>
                    <Link href="https://www.youtube.com/@AnimeHeroesAllstarClash" target="_blank">
                        <svg className="youtube" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M24.769 5H7.23a6.231 6.231 0 00-6.231 6.231v8.768A6.231 6.231 0 007.23 26.23h17.539A6.231 6.231 0 0031 19.999v-8.768A6.231 6.231 0 0024.769 5zm-4.213 11.041l-8.203 3.913a.33.33 0 01-.471-.297v-8.07a.33.33 0 01.478-.294l8.203 4.157a.33.33 0 01-.007.591z"></path>
                        </svg>
                    </Link>
                    <Link href="https://www.instagram.com/animeheroesallstar/" target="_blank">
                        <svg className="instagran" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 8.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 12.188A4.695 4.695 0 0111.312 16c0-2.586 2.104-4.688 4.688-4.688s4.688 2.102 4.688 4.688A4.695 4.695 0 0116 20.688zm8.063-11.751a.999.999 0 110-1.997.999.999 0 010 1.997zM21.625 1h-11.25A9.376 9.376 0 001 10.375v11.25A9.376 9.376 0 0010.375 31h11.25A9.376 9.376 0 0031 21.625v-11.25A9.376 9.376 0 0021.625 1zm6.563 20.625a6.57 6.57 0 01-6.563 6.563h-11.25a6.57 6.57 0 01-6.563-6.563v-11.25a6.57 6.57 0 016.563-6.563h11.25a6.57 6.57 0 016.563 6.563v11.25z"></path>
                        </svg>
                    </Link>
                </div>
                <div className="licence">
                    <p>Anime Heroes Allstar Clash © 2024</p>
                    <p className="licence-credits">
                        Uma aplicação desenvolvida por{" "}
                        <Link
                            href="https://andrejuan.vercel.app/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="licence-logo-link"
                            aria-label="Contato - AJ Software"
                        >
                            {!logoError ? (
                                <Image
                                    src="/images/logoAJsoftware.png"
                                    alt="AJ Software"
                                    width={250}
                                    height={70}
                                    className="licence-logo"
                                    onError={() => setLogoError(true)}
                                />
                            ) : (
                                <span className="licence-logo-text">AJ Software</span>
                            )}
                            <span className="licence-contact">Entre em contato</span>
                            <svg className="licence-external-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </Link>
                    </p>
                </div>
            </div>    
        </footer>
    )

}