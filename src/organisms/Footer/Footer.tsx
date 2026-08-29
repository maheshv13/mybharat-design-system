import Branding from "../../molecules/Branding/Branding";
import LinkList from "../../molecules/LinkList/LinkList";
import SocialLinks from "../../molecules/SocialLinks/SocialLinks";
import { Text } from "../../atoms/Text";
import { Image } from "../../atoms/Image";
import Section from "../../primitives/Section/Section";
import type { LinkListItem } from "../../molecules/LinkList/LinkList";
import styles from "./Footer.module.css";

export interface FooterProps {
  importantLinks?: LinkListItem[];
  usefulLinks?: LinkListItem[];
}

const Footer = ({
  importantLinks,
  usefulLinks,
}: FooterProps) => {

  return (
    <footer className={styles.footer}>
      <Section 
        contained 
        spaceY="md"
        >
        <div className={styles.columns}>
          
          {/*Logo & Emblem */}
          <div className={styles.brandColumn}>
            <Branding
              hasEmblem={true}
            />
            <Text
                variant="helper"
                as="p"
                className={styles.description}
                >
                  MY Bharat is an initiative of Ministry of Youth Affairs & Sports to empower Indian youth through social mobility, educational equity, and practical skills.
                </Text>
            <Text
                variant="helper"
                as="div"
                className={styles.updated}
                >Last updated: 25-02-2026</Text>
          </div>

          {/*Important Links */}
          <div className={styles.importantColumn}>
            <LinkList 
              title="Important Links" 
              links={importantLinks}
              variant="dark"
              />
          </div>

          {/* Useful Links */}
          <div className={styles.usefulColumn}>
          <LinkList 
            title="Useful Links" 
            links={usefulLinks}
            variant="dark"
            />
          </div>

          {/* Social */}
          <div className={styles.socialColumn}>
            <SocialLinks 
              SocialLinksHeading="Follow Us"
            />
            <Text as="div" className={styles.poweredBy}>
              Powered by:
              <span className={styles.digitalIndia}>
                <Image alt="Digital India" src="https://cdn-prod.mybharats.in/mybharat/assets/img/yuva_landing/DigitalIndiamybharat.svg"/>
              </span>
            </Text>
            
            <Text variant="helper" as="p">
              Digital India Corporation (DIC) Ministry of Electronics & IT (MeitY) Government of India
            </Text>
          </div>

        </div>
      </Section>
    </footer>
  )
}

export default Footer;