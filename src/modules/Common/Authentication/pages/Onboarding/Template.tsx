import React from 'react'
import styles from './Template.module.css'
import mufo from '../../assets/mufo.webp'
import muship from '../../assets/muship.webp'
import astroo from '../../assets/astroo.webp'
import astro from '../../assets/astro.webp'
import planet from '../../assets/planet.webp'
import OnboardingHeader from '../../components/Head/OnboardingHeader'

export default function Template() {
    return (
        <div className={styles.Template}>
            <img className={styles.TemplatePlanet} src={planet} alt="" />
            <img className={styles.TemplateAstro} src={astro} alt="" />
            <img className={styles.TemplateAstroo} src={astroo} alt="" />
            <img className={styles.TemplateMufo} src={mufo} alt="" />
            <img className={styles.TemplateMuship} src={muship} alt="" />
            <OnboardingHeader />
        </div>
    )
}
