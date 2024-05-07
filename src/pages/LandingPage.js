import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.landingPage}>
      <header className={styles.frameParent}>
        <div className={styles.frame}>
          <div className={styles.groupWrapper}>
            <img
              className={styles.groupIcon}
              loading="lazy"
              alt=""
              src="/group.svg"
            />
          </div>
          <img className={styles.groupIcon1} alt="" src="/group-1.svg" />
          <img className={styles.groupIcon2} alt="" src="/group-2.svg" />
          <img className={styles.vectorIcon} alt="" />
        </div>
        <div className={styles.frameWrapper}>
          <div className={styles.frameGroup}>
            <button className={styles.vectorParent} onClick={() => navigate("/signUp")}>
              <img className={styles.frameChild} alt="" src="/rectangle-82.svg" />
              <div className={styles.signUp}>Sign up</div>
            </button>
            <button className={styles.rectangleParent} onClick={() => navigate("/logIn")}>
              <div className={styles.frameItem} />
              <div className={styles.signIn}>Sign in</div>
            </button>
          </div>
        </div>
      </header>
      <img className={styles.vectorIcon0} alt="" src="/vector.svg"/>
      <main className={styles.landingPageInner}>
        <section className={styles.frameParent1}>
          <div className={styles.brainTumorSegmentationParent}>
            <div className={styles.brainTumorSegmentation}>
              <h1 className={styles.brainTumorSegmentationContainer}>
                <span>
                  <span className={styles.brainTumor}>{`Brain Tumor `}</span>
                  <span className={styles.segmentation}>Segmentation</span>
                </span>
              </h1>
              <div className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div className={styles.brainTumorSegmentationInner}>
                <div className={styles.frameGroup1}>
                  <button className={styles.vectorParent} onClick={() => navigate("/")}>
                    <img
                      className={styles.frameChild}
                      alt=""
                      src="/rectangle-84.svg"
                    />
                    <div className={styles.watchVideo}>Watch Video</div>
                  </button>
                  <button className={styles.rectangleParent}  onClick={() => navigate("/")}>
                    <div className={styles.frameItem} />
                    <div className={styles.tryItNow}>Try It Now</div>
                    <img
                      className={styles.vectorIcon1}
                      alt=""
                      src="/vector.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.imageContainerWrapper}>
              <div className={styles.imageContainer}>
                <h2 className={styles.imageDescription}>IMAGE DESCRIPTION</h2>
                <img
                  className={styles.image6Icon}
                  loading="lazy"
                  alt=""
                  src="/image-6@2x.png"
                />
              </div>
            </div>
          </div>
          <img className={styles.vectorIcon2} alt="" src="/vector-2.svg" />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
