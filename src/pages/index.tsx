import React from "react";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import DownloadSlider from '@/components/DownloadSlider';

export default function Home() {
  const { t } = useTranslation();


  return (
    <>
      <Header animeList={[]} selectedAnime="" onSelectAnime={() => {}} />
      <div className="home">
        <section className="home-section">
          <h1>{t("titlehome")}</h1>
          <p>{t("descriptionhome")}</p>
        </section>
        <section className="style-section-container">
          <h2>{t("styledescription")}</h2>
          <div className="style-section">
            <div>
              <Image 
                src="/images/martialartist.png"
                alt="Martial Artist image"
                width={500}
                height={300}
              />
              <p>{t("stylemartialartist")}</p>
            </div>
            <div>
              <Image 
                src="/images/swordsman.png"
                alt="Swordsman image"
                width={500}
                height={300}
              />
              <p>{t("styleswordsman")}</p>
            </div>
            <div>
              <Image 
                src="/images/mage.png"
                alt="Mage image"
                width={500}
                height={300}
              />
              <p>{t("stylemage")}</p>
            </div>
            <div>
              <Image 
                src="/images/magicfist.png"
                alt="Magic Fist image"
                width={500}
                height={300}
              />
              <p>{t("stylemagicfist")}</p>
            </div>
          </div>
        </section>

        <section className="question-container">
          <h4>{t("majorquestion")}</h4>
          <h1>{t("allstardefeat")}</h1>
        </section>

        <section className="feautures-container">
          <h1>{t("jointofight")}</h1>
          <div className="feautures">
            <div>
              <div className="feautures-elements">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M25.313 13.313h2.688v5.375h-2.688v-5.375zM20 24V8h2.688v16H20zM4 18.688v-5.375h2.688v5.375H4zm10.688 10.625V2.688h2.625v26.625h-2.625zM9.313 24V8h2.688v16H9.313z">
                </path>
                </svg> 
                <div className="after">
                </div>
                <div className="feautures-text">
                  <h2>{t("retrographics")}</h2>
                  <p>{t("textretro")}</p>
                </div>
              </div>
              <div className="feautures-elements">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16.688 10.688v5.625l4.625 2.813-.938 1.625-5.688-3.438v-6.625h2zM28 13.5h-9.063l3.688-3.75C19 6.125 13.062 6 9.437 9.625s-3.625 9.375 0 13 9.563 3.625 13.188 0c1.813-1.813 2.688-3.875 2.688-6.5h2.688c0 2.625-1.125 6.063-3.5 8.375-4.688 4.625-12.313 4.625-17 0s-4.688-12.125 0-16.75 12.188-4.625 16.875 0L28.001 4v9.5z"></path>
                </svg>
                <div className="after">
                </div>
                <div className="feautures-text">
                  <h2>{t("frequentupdates")}</h2>
                  <p>{t("textupdates")}</p>
                </div>
              </div>
              <div className="feautures-elements">
                <svg width="32" height="32" viewBox="-0.08 -0.08 0.96 0.96" xmlns="http://www.w3.org/2000/svg"><path d="M.24 0h.32A.24.24 0 0 1 .8.24v.32A.24.24 0 0 1 .56.8H.24A.24.24 0 0 1 0 .56V.24A.24.24 0 0 1 .24 0m0 .08a.16.16 0 0 0-.16.16v.32a.16.16 0 0 0 .16.16h.32A.16.16 0 0 0 .72.56V.24A.16.16 0 0 0 .56.08zm.24.28H.6a.04.04 0 0 1 0 .08H.48a.04.04 0 0 1 0-.08M.4.52h.2A.04.04 0 0 1 .6.6H.4a.04.04 0 0 1 0-.08M.4.2h.2a.04.04 0 0 1 0 .08H.4A.04.04 0 1 1 .4.2M.233.41.318.325a.04.04 0 1 1 .057.057L.262.495a.04.04 0 0 1-.057 0L.148.438A.04.04 0 0 1 .205.381z"/>
                </svg>
                <div className="after">
                </div>
                <div className="feautures-text">
                  <h2>{t("newfeautures")}</h2>
                  <p>{t("textfeauteres")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="download-container">
          <div className="download">
            <h1>DOWNLOAD</h1>
            <p>{t("downloadtext")}</p>
            <Link className="linkdownload" href="https://ko-fi.com/s/8142dc18ca" target="_blank">
              <button className="support-button">
                v0.99
              </button>
            </Link>
          </div>
          <div className="download-feautures">
            <div className="download-ftext">
              <article>
              <div className="svg"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M30.944 11.743h-9.945L16.996 1.737a1.063 1.063 0 00-1.981 0l-4.003 9.996H1.056A1.06 1.06 0 000 12.81c0 .356.183.681.467.874l8.879 5.923-3.952 9.864a1.067 1.067 0 001.585 1.29L16 24.757l9.021 6.004a1.075 1.075 0 001.483-.295c.193-.295.234-.67.102-.996l-3.952-9.864 8.879-5.923c.488-.325.62-.996.295-1.483a1.098 1.098 0 00-.884-.457z"></path>
                </svg></div>
                <div className="articletext">
                  <h2>{t("uniqueExperience")}</h2>
                  <p>{t("uniqueExperiencetext")}</p>
                </div>
              </article>

              <article>
                <div className="svg"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M24 26.688V13.313H8v13.375h16zm0-16c1.438 0 2.688 1.188 2.688 2.625v13.375c0 1.438-1.25 2.625-2.688 2.625H8c-1.438 0-2.688-1.188-2.688-2.625V13.313c0-1.438 1.25-2.625 2.688-2.625h12.125V8c0-2.25-1.875-4.125-4.125-4.125S11.875 5.75 11.875 8H9.312c0-3.688 3-6.688 6.688-6.688s6.688 3 6.688 6.688v2.688h1.313zm-8 12c-1.438 0-2.688-1.25-2.688-2.688s1.25-2.688 2.688-2.688 2.688 1.25 2.688 2.688-1.25 2.688-2.688 2.688z"></path>
                </svg></div>
                <div className="articletext">
                  <h2>{t("unlocksystem")}</h2>
                  <p>{t("unlocksystemtext")}</p>
                </div>
              </article>

              <article>
              <div className="svg"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32"><path d="M14.344 2.417a2.876 2.876 0 11-5.677.92 2.876 2.876 0 015.677-.92zM22.329 6.816a1.292 1.292 0 00-1.714.592l-.003.008s-1.29 2.255-1.94 2.834c-.731-.427-1.747-1.839-3.119-2.712a7.806 7.806 0 00-8.107 0c-1.209.782-2.855 2.723-3.098 2.723-.701-.64-1.95-2.834-1.95-2.834A1.281 1.281 0 00.105 8.553l-.003-.009c.224.559 1.849 4.805 4.196 4.805 1.636 0 3.342-1.879 3.698-2.204v6.105l-.64 13.41a1.27 1.27 0 001.164 1.341h.126a1.28 1.28 0 001.27-1.121l.001-.006 1.371-11.672h.447l1.382 11.672a1.272 1.272 0 001.262 1.128H14.499a1.292 1.292 0 001.18-1.285l-.001-.058v.003l-.64-13.41v-6.105c.345.335 2.052 2.194 3.677 2.194 2.296 0 3.972-4.246 4.196-4.805h.01a1.299 1.299 0 00-.582-1.713l-.007-.003z"></path>
                </svg></div>
                <div className="articletext">
                  <h2>{t("secretstransforms")}</h2>
                  <p>{t("secretstransformstext")}</p>
                </div>
              </article>

            </div>
            <div className="download-fslide">
              <DownloadSlider />
            </div>
          </div> 
          <div className="download-info">
            <div className="play">
              <div className="svgdownloadbot">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M26 16c1.125 0 2-.875 2-2s-.875-2-2-2-2 .875-2 2 .875 2 2 2zm-5.312 4c1.125 0 2-.875 2-2s-.875-2-2-2-2 .875-2 2 .875 2 2 2zm-6-2.687v-2.625h-4v-4H8v4H4v2.625h4v4h2.688v-4h4zM28 8c1.438 0 2.688 1.25 2.688 2.688v10.625c0 1.438-1.25 2.688-2.688 2.688H4c-1.438 0-2.688-1.25-2.688-2.688V10.688C1.312 9.25 2.562 8 4 8h24z"></path></svg>
              </div>
              <div className="playtext">
                <h1>{t("easy")}</h1>
                <p>{t("easytext")}</p>
              </div>
            </div>
            <hr></hr>
            <div className="play">
              <div className="svgdownloadbot">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M20 18.688c3.563 0 10.688 1.75 10.688 5.313v2.688H9.313v-2.688c0-3.563 7.125-5.313 10.688-5.313zM8 13.313h4v2.688H8v4H5.312v-4h-4v-2.688h4v-4H8v4zM20 16c-2.938 0-5.313-2.375-5.313-5.313S17.062 5.312 20 5.312s5.313 2.438 5.313 5.375S22.938 16 20 16z"></path></svg>
              </div>
              <div className="playtext">
                <h1>{t("chars")}</h1>
                <p>{t("charstext")}</p>
              </div>
            </div>
            <hr></hr>
            <div className="play">
              <div className="svgdownloadbot">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M18.133 24.533H7.466a1.067 1.067 0 01-1.067-1.067v-7.03l1.371 1.382c.416.416 1.097.416 1.514 0s.416-1.097 0-1.514l-3.19-3.2a1.07 1.07 0 00-1.503-.01l-.01.01-3.2 3.2c-.416.416-.416 1.097 0 1.514s1.097.416 1.514 0l1.371-1.382v7.03a3.2 3.2 0 003.2 3.2h10.667a1.067 1.067 0 100-2.134zM13.867 7.467h10.667c.589 0 1.067.477 1.067 1.067v7.03l-1.371-1.392c-.416-.416-1.097-.416-1.514 0s-.416 1.097 0 1.514l3.19 3.21a1.07 1.07 0 001.503.01l.01-.01 3.2-3.2c.416-.416.416-1.097 0-1.514s-1.097-.416-1.514 0l-1.371 1.382v-7.03a3.2 3.2 0 00-3.2-3.2H13.867a1.067 1.067 0 100 2.134zM29.308 26.321a3.285 3.285 0 00.559-1.788 3.2 3.2 0 10-6.4 0c0 .64.193 1.26.559 1.788a5.34 5.34 0 00-2.692 4.612c0 .589.477 1.067 1.067 1.067h8.533c.589 0 1.067-.477 1.067-1.067a5.34 5.34 0 00-2.692-4.612zM9.6 10.667c.589 0 1.067-.477 1.067-1.067a5.34 5.34 0 00-2.692-4.612A3.285 3.285 0 008.534 3.2a3.2 3.2 0 10-6.4 0c0 .64.193 1.26.559 1.788A5.34 5.34 0 00.001 9.6c0 .589.477 1.067 1.067 1.067h8.533z"></path></svg>
              </div>
              <div className="playtext">
                <h1>{t("coop")}</h1>
                <p>{t("cooptext")}</p>
              </div>
            </div>
          </div>   
        </section>

        <section className="faq-container">
          <h1>FAQ</h1>
          <p className="p">{t("faqtext")}</p>
          <div className="faq-grid">
            <div className="faq">
              <div>
                <svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M15.333 9.5A3.5 3.5 0 0 0 8.8 7.75a1 1 0 0 0 1.733 1 1.5 1.5 0 0 1 1.3-.75 1.5 1.5 0 1 1 0 3h-.003a1 1 0 0 0-.19.039 1 1 0 0 0-.198.04 1 1 0 0 0-.155.105 1 1 0 0 0-.162.11 1 1 0 0 0-.117.174 1 1 0 0 0-.097.144 1 1 0 0 0-.043.212 1 1 0 0 0-.035.176v1l.002.011v.491a1 1 0 0 0 1 .998h.003a1 1 0 0 0 .998-1.002l-.002-.662A3.49 3.49 0 0 0 15.333 9.5m-4.203 6.79a1 1 0 0 0 .7 1.71 1.04 1.04 0 0 0 .71-.29 1.015 1.015 0 0 0 0-1.42 1.034 1.034 0 0 0-1.41 0"/>
                </svg>
              </div>
              <div className="question">
                <h2>{t("question1")}</h2>
                <p>{t("answer1")}</p>
              </div>
            </div>
            <div className="faq">
              <div>
                <svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M15.333 9.5A3.5 3.5 0 0 0 8.8 7.75a1 1 0 0 0 1.733 1 1.5 1.5 0 0 1 1.3-.75 1.5 1.5 0 1 1 0 3h-.003a1 1 0 0 0-.19.039 1 1 0 0 0-.198.04 1 1 0 0 0-.155.105 1 1 0 0 0-.162.11 1 1 0 0 0-.117.174 1 1 0 0 0-.097.144 1 1 0 0 0-.043.212 1 1 0 0 0-.035.176v1l.002.011v.491a1 1 0 0 0 1 .998h.003a1 1 0 0 0 .998-1.002l-.002-.662A3.49 3.49 0 0 0 15.333 9.5m-4.203 6.79a1 1 0 0 0 .7 1.71 1.04 1.04 0 0 0 .71-.29 1.015 1.015 0 0 0 0-1.42 1.034 1.034 0 0 0-1.41 0"/>
                </svg>
              </div>
              <div className="question">
                <h2>{t("question2")}</h2>
                <p>{t("answer2")}</p>
              </div>
            </div> 
            <div className="faq">
              <div>
                <svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M15.333 9.5A3.5 3.5 0 0 0 8.8 7.75a1 1 0 0 0 1.733 1 1.5 1.5 0 0 1 1.3-.75 1.5 1.5 0 1 1 0 3h-.003a1 1 0 0 0-.19.039 1 1 0 0 0-.198.04 1 1 0 0 0-.155.105 1 1 0 0 0-.162.11 1 1 0 0 0-.117.174 1 1 0 0 0-.097.144 1 1 0 0 0-.043.212 1 1 0 0 0-.035.176v1l.002.011v.491a1 1 0 0 0 1 .998h.003a1 1 0 0 0 .998-1.002l-.002-.662A3.49 3.49 0 0 0 15.333 9.5m-4.203 6.79a1 1 0 0 0 .7 1.71 1.04 1.04 0 0 0 .71-.29 1.015 1.015 0 0 0 0-1.42 1.034 1.034 0 0 0-1.41 0"/>
                </svg>
              </div>
              <div className="question">
                <h2>{t("question3")}</h2>
                <p>{t("answer3")}</p>
              </div>
            </div> 
            <div className="faq">
              <div>
                <svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M15.333 9.5A3.5 3.5 0 0 0 8.8 7.75a1 1 0 0 0 1.733 1 1.5 1.5 0 0 1 1.3-.75 1.5 1.5 0 1 1 0 3h-.003a1 1 0 0 0-.19.039 1 1 0 0 0-.198.04 1 1 0 0 0-.155.105 1 1 0 0 0-.162.11 1 1 0 0 0-.117.174 1 1 0 0 0-.097.144 1 1 0 0 0-.043.212 1 1 0 0 0-.035.176v1l.002.011v.491a1 1 0 0 0 1 .998h.003a1 1 0 0 0 .998-1.002l-.002-.662A3.49 3.49 0 0 0 15.333 9.5m-4.203 6.79a1 1 0 0 0 .7 1.71 1.04 1.04 0 0 0 .71-.29 1.015 1.015 0 0 0 0-1.42 1.034 1.034 0 0 0-1.41 0"/>
                </svg>
              </div>
              <div className="question">
                <h2>{t("question4")}</h2>
                <p>{t("answer4")}</p>
              </div>
            </div>
          </div>    
        </section>

      </div>
    </>
  );
}
